import { CardTransaction } from "../../../core/entities/CardTransaction";
import Client from "../../../core/entities/Client";
import Transaction from "../../../core/entities/Transaction";
import IPersistenciaTransacciones from "../../../core/ports/persistencia/IPersistenciaTransacciones";
import CardTransactionModel, { ICardTransactionModel } from "../models/CardTransactionModel";
import { TransactionCaster } from "../../../utils/db.model.casts";
import ClientModel from "../models/ClientModel";

export default class PersistenciaDeTransacciones implements IPersistenciaTransacciones {
	public async guardarTransaccionDeClient(transaction: Transaction): Promise<boolean> {
		try {
			return !!(await TransactionCaster.cardTransactionToModel(transaction as CardTransaction).save());
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async obtenerTransaccionesDeClient(client: Client): Promise<Transaction[]> {
		try {
			// Search Transactions of the Client
			const transactionsToReturn: CardTransaction[] = [];
			const clientFound = await ClientModel.findOne({
				user: client.getUser(),
			}).select("transactions");
			if (clientFound && clientFound !== undefined) {
				const transactionsFound = clientFound.transactions;
				// Retrieve every single Transaction found
				for (const transaction of transactionsFound) {
					const cardTransaction = await CardTransactionModel.findOne({
						id: transaction.id,
					});
					if (cardTransaction && cardTransaction !== undefined) transactionsToReturn.push(TransactionCaster.modelToCardTransaction(cardTransaction));
				}
			}
			// Set Transactions found
			return transactionsToReturn;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async obtenerTodasLasTransacciones(): Promise<Transaction[]> {
		try {
			const transactions: ICardTransactionModel[] | null = (await CardTransactionModel.find()) || null;
			return transactions ? transactions.map((transactionModel) => TransactionCaster.modelToCardTransaction(transactionModel)) : [];
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
