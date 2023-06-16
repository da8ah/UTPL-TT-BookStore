import ToBuyBook from "./ToBuyBook";

export default class Cart {
	private discountCalc = 0;
	private ivaCalc = 0;
	private subtotal = 0;
	private totalPrice = 0;
	private toBuyBooks: ToBuyBook[];

	constructor(toBuyBooks: ToBuyBook[]) {
		this.toBuyBooks = toBuyBooks;
		this.calculate();
	}

	public calculate() {
		const books = this.toBuyBooks;
		if (books.length > 0) {
			let discountAcc = 0;
			let ivaAcc = 0;
			let subtotal = 0;
			let totalPrice = 0;
			for (const book of books) {
				const cant = book.getCant();
				const discount = book.getDiscountedAmount();
				const iva = book.getIvaAmount();
				const grossPricePerUnit = book.getGrossPricePerUnit();
				const priceCalcPerUnit = book.getPriceCalcPerUnit();

				// Calc with all quantities
				discountAcc = discountAcc + discount * cant;
				ivaAcc = ivaAcc + iva * cant;
				subtotal = subtotal + grossPricePerUnit * cant;
				totalPrice = totalPrice + priceCalcPerUnit * cant;
			}
			this.discountCalc = discountAcc;
			this.ivaCalc = ivaAcc;
			this.subtotal = subtotal;
			this.totalPrice = totalPrice;
		}
	}

	// Getters
	public getDiscountCalc(): number {
		return this.discountCalc;
	}
	public getIvaCalc(): number {
		return this.ivaCalc;
	}
	public getSubtotal(): number {
		return this.subtotal;
	}
	public getTotalPrice(): number {
		return this.totalPrice;
	}
	public getToBuyBooks(): ToBuyBook[] {
		return this.toBuyBooks;
	}

	// Setters
	public setToBuyBooks(toBuyBooks: ToBuyBook[]) {
		this.toBuyBooks = toBuyBooks;
		this.calculate();
	}

	public addToBuyBook(toBuyBooks: ToBuyBook) {
		this.toBuyBooks.push(toBuyBooks);
		this.calculate();
	}
	public rmToBuyBook(toBuyBooks: ToBuyBook) {
		const index = this.toBuyBooks.indexOf(toBuyBooks);
		this.toBuyBooks.splice(index, 1);
		this.calculate();
	}
}
