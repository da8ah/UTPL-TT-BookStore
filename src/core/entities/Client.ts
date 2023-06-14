import BillingInfo from "./BillingInfo";
import Card from "./Card";
import Transaction from "./Transaction";
import User from "./User";

export default class Client extends User {
	private billingInfo: BillingInfo;
	private cards: Card[] = [];
	private transactions: Transaction[] = [];

	constructor(
		user: string,
		name: string,
		email: string,
		mobile: string,
		password: string,
		billingInfo: BillingInfo = new BillingInfo("", "", "", "", "", ""),
		cards: Card[] = [],
		transactions: Transaction[] = [],
	) {
		super(user, name, email, mobile, password);
		this.billingInfo = billingInfo;
		this.cards = cards?.sort((a, b) => (a.getCardNumber() > b.getCardNumber() ? 1 : -1));
		this.transactions = transactions;
	}

	public getBillingInfo(): BillingInfo {
		return this.billingInfo;
	}
	public setBillingInfo(billingInfo: BillingInfo) {
		this.billingInfo = billingInfo;
	}

	public getCards(): Card[] {
		return this.cards?.sort((a, b) => (a.getCardNumber() > b.getCardNumber() ? 1 : -1));
	}
	public setCards(cards: Card[]) {
		this.cards = cards.sort((a, b) => (a.getCardNumber() > b.getCardNumber() ? 1 : -1));
	}

	public getTransactions(): Transaction[] {
		return this.transactions;
	}
	public setTransactions(transactions: Transaction[]) {
		this.transactions = transactions;
	}
}
