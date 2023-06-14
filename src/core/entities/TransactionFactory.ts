import { CardTransaction } from "./CardTransaction";

export default class TransactionFactory {
	public createTransaction(transactionType: "card" = "card"): CardTransaction {
		switch (transactionType.toLowerCase()) {
			default:
				return new CardTransaction();
		}
	}
}
