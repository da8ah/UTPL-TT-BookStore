import Card from "../../entities/Card";
import Cart from "../../entities/Cart";
import Client from "../../entities/Client";
import ToBuyBook from "../../entities/ToBuyBook";
import TransactionFactory from "../../entities/TransactionFactory";
import IPago from "../../ports/IPago";
import IPersistenciaClient from "../../ports/persistencia/IPersistenciaClient";
import IPersistenciaLibro from "../../ports/persistencia/IPersistenciaLibro";
import IPersistenciaTransacciones from "../../ports/persistencia/IPersistenciaTransacciones";
import GestionDeLibros from "../admin/GestionDeLibros";

export default class TransaccionesDelClient {
	public static pagarCarrito(iPago: IPago, cart: Cart): Promise<boolean> {
		return iPago.procesarPago(cart);
	}

	public static async registrarTransaccion(
		card: Card,
		client: Client,
		cart: Cart,
		iPersistenciaLibro: IPersistenciaLibro,
		iPersistenciaTransacciones: IPersistenciaTransacciones,
		iPersistenciaClient: IPersistenciaClient,
	): Promise<Client> {
		try {
			// 1. RESTAR LIBROS DEL STOCK DISPONIBLE
			const boughtBooks: ToBuyBook[] = [];
			for (const toBuyBook of cart.getToBuyBooks()) {
				const stockBook = await iPersistenciaLibro.buscarUnLibroPorISBN(toBuyBook.getIsbn());
				if (stockBook) {
					// CONTINUAR SI ALGÚN LIBRO NO SE ACTUALIZA
					try {
						if (stockBook.getStock() >= toBuyBook.getCant() && toBuyBook.getCant() > 0) {
							stockBook.setStock(stockBook.getStock() - toBuyBook.getCant());
							// Posible Error
							if (await GestionDeLibros.actualizarLibro(iPersistenciaLibro, stockBook)) boughtBooks.push(toBuyBook);
						} else if (stockBook.getStock() < toBuyBook.getCant() && stockBook.getStock() > 0 && toBuyBook.getCant() > 0) {
							toBuyBook.setCant(stockBook.getStock());
							stockBook.setStock(0);
							// Posible Error
							if (await GestionDeLibros.actualizarLibro(iPersistenciaLibro, stockBook)) boughtBooks.push(toBuyBook);
						}
					} catch (error) {
						console.error(error);
					}
				}
			}
			cart.setToBuyBooks(boughtBooks);

			// 2. REGISTRAR NUEVA TRANSACCIÓN
			const transaction = new TransactionFactory().createTransaction();
			transaction.setId(crypto.randomUUID());
			transaction.setCardNumber(card.getCardNumber());
			transaction.setUser(client.getUser());
			transaction.setName(client.getName());
			transaction.setEmail(client.getEmail());
			transaction.setMobile(client.getMobile());
			transaction.setDate(new Date().toLocaleDateString());
			transaction.setPayment(cart.getTotalPrice());
			transaction.setCart(cart);
			if (!(await iPersistenciaTransacciones.guardarTransaccionDeClient(transaction))) throw Error("Transaction was not saved!");

			// 3. AGREGAR TRANSACCIÓN AL CLIENT
			if (!(await iPersistenciaClient.agregarTransaction(new Client(client.getUser(), "", "", "", ""), transaction))) throw Error("Transaction saved but is unrelated to the Client!");

			// 4. RETORNAR CLIENT CON TRANSACCIONES ACTUALIZADAS
			return this.listarMisTransacciones(client, iPersistenciaTransacciones);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public static async listarMisTransacciones(client: Client, iPersistenciaTransacciones: IPersistenciaTransacciones): Promise<Client> {
		const transactions = await iPersistenciaTransacciones.obtenerTransaccionesDeClient(new Client(client.getUser(), "", "", "", ""));
		client.setTransactions(transactions);
		return client;
	}
}
