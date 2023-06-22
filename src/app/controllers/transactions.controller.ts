import { Request, Response } from "express";
import Card from "../../core/entities/Card";
import Cart from "../../core/entities/Cart";
import Client from "../../core/entities/Client";
import TransaccionesDelClient from "../../core/usecases/client/TransaccionesDelClient";
import PersistenciaDeClient from "../../services/database/adapters/PersistenciaDeClient";
import PersistenciaDeTransacciones from "../../services/database/adapters/PersistenciaDeTransacciones";
import { TransactionConverter } from "../../utils/json.casts";

export default class TransactionsController {
	public async createCardTransaction(req: Request, res: Response) {
		try {
			const transactionReturned = TransactionConverter.jsonToCardTransaction(req);
			const books = transactionReturned.getCart()?.getToBuyBooks();
			if (books !== undefined) {
				const resultado = await TransaccionesDelClient.registrarTransaccion(
					new PersistenciaDeClient(),
					new PersistenciaDeTransacciones(),
					new Card("", transactionReturned.getCardNumber(), "", ""),
					new Client(transactionReturned.getUser(), transactionReturned.getName(), transactionReturned.getEmail(), transactionReturned.getMobile(), ""),
					new Cart(books),
				);
				return res.status(200).json(resultado);
			}

			return res.status(400).json({ msg: "Transaction was not saved!" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async retrieveTransacions(req: Request, res: Response) {
		try {
			const client = new Client(req.params.user, "", "", "", "");
			const resultado = await TransaccionesDelClient.listarMisTransacciones(new PersistenciaDeTransacciones(), client);
			return res.status(200).json(resultado);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}
}
