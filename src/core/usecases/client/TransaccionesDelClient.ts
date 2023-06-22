import crypto from "crypto";
import Card from "../../entities/Card";
import Cart from "../../entities/Cart";
import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";
import TransactionFactory from "../../entities/TransactionFactory";
import IPersistenciaClient from "../../ports/persistencia/IPersistenciaClient";
import IPersistenciaTransacciones from "../../ports/persistencia/IPersistenciaTransacciones";

export default class TransaccionesDelClient {
	public static async registrarTransaccion(
		iPersistenciaClient: IPersistenciaClient,
		iPersistenciaTransacciones: IPersistenciaTransacciones,
		card: Card,
		client: Client,
		cart: Cart,
	): Promise<Transaction[]> {
		try {
			// 1. REGISTRAR NUEVA TRANSACCIÓN
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

			// 2. AGREGAR TRANSACCIÓN AL CLIENT
			if (!(await iPersistenciaClient.agregarTransaction(new Client(client.getUser(), "", "", "", ""), transaction))) throw Error("Transaction saved but is unrelated to the Client!");

			// 3. RETORNAR CLIENT CON TRANSACCIONES ACTUALIZADAS
			return this.listarMisTransacciones(iPersistenciaTransacciones, client);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public static async listarMisTransacciones(iPersistenciaTransacciones: IPersistenciaTransacciones, client: Client): Promise<Transaction[]> {
		return await iPersistenciaTransacciones.obtenerTransaccionesDeClient(new Client(client.getUser(), "", "", "", ""));
	}
}
