import Cart from "./Cart";
import Transaction from "./Transaction";

export default class CardTransaction extends Transaction {
	private cardNumber: string;

	constructor(id = "", cardNumber = "", user = "", name = "", email = "", mobile = "", date = "", payment = 0, cart?: Cart) {
		super(id, user, name, email, mobile, date, payment, cart);
		this.cardNumber = cardNumber;
	}

	public getCardNumber(): string {
		return this.cardNumber;
	}
	public setCardNumber(cardNumber: string) {
		this.cardNumber = cardNumber;
	}
}
