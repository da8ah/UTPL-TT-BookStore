export default class Card {
	private ownerName: string;
	private cardNumber: string;
	private code: string;
	private expiryDate: string;

	constructor(ownerName: string, cardNumber: string, code: string, expiryDate: string) {
		this.ownerName = ownerName;
		this.cardNumber = cardNumber;
		this.code = code;
		this.expiryDate = expiryDate;
	}

	public getOwnerName(): string {
		return this.ownerName;
	}
	public setOwnerName(ownerName: string) {
		this.ownerName = ownerName;
	}

	public getCardNumber(): string {
		return this.cardNumber;
	}
	public setCardNumber(cardNumber: string) {
		this.cardNumber = cardNumber;
	}

	public getCode(): string {
		return this.code;
	}
	public setCode(code: string) {
		this.code = code;
	}

	public getExpiryDate(): string {
		return this.expiryDate;
	}
	public setExpiryDate(expiryDate: string) {
		this.expiryDate = expiryDate;
	}
}
