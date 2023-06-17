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
	public static pagarCarrito(iPago: IPago, cart: Cart) {
		return iPago.procesarPago(cart);
	}

	public static registrarTransaccion(
		card: Card,
		client: Client,
		cart: Cart,
		iPersistenciaLibro: IPersistenciaLibro,
		iPersistenciaTransacciones: IPersistenciaTransacciones,
		iPersistenciaClient: IPersistenciaClient,
	): Client {
		try {
			// 1. RESERVAR LIBROS DEL STOCK DISPONIBLE
			const boughtBooks: ToBuyBook[] = [];
			for (const toBuyBook of cart.getToBuyBooks()) {
				const stockBook = iPersistenciaLibro.buscarUnLibroPorISBN(toBuyBook.getIsbn());
				if (stockBook) {
					if (stockBook.getStock() >= toBuyBook.getCant() && toBuyBook.getCant() > 0) {
						stockBook.setStock(stockBook.getStock() - toBuyBook.getCant());
						GestionDeLibros.actualizarLibro(iPersistenciaLibro, stockBook);
						boughtBooks.push(toBuyBook);
					} else if (stockBook.getStock() < toBuyBook.getCant() && stockBook.getStock() > 0 && toBuyBook.getCant() > 0) {
						toBuyBook.setCant(stockBook.getStock());
						stockBook.setStock(0);
						GestionDeLibros.actualizarLibro(iPersistenciaLibro, stockBook);
						boughtBooks.push(toBuyBook);
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
			iPersistenciaTransacciones.guardarTransaccionDeClient(transaction);

			// 3. AGREGAR TRANSACCIÓN AL CLIENT
			iPersistenciaClient.agregarTransaction(new Client(client.getUser(), "", "", "", ""), transaction);

			// 4. RETORNAR CLIENT CON TRANSACCIONES ACTUALIZADAS
			return this.listarMisTransacciones(client, iPersistenciaTransacciones);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	public static listarMisTransacciones(client: Client, iPersistenciaTransacciones: IPersistenciaTransacciones): Client {
		const transactions = iPersistenciaTransacciones.obtenerTransaccionesDeClient(new Client(client.getUser(), "", "", "", ""));
		client.setTransactions(transactions);
		return client;
	}
}
