import Book from "./Book";

export default class ToBuyBook extends Book {
	private discountedAmount = 0;
	private ivaAmount = 0;
	private priceWithDiscount = 0;
	private priceWithIva = 0;
	private cant = 0;
	private priceCalcPerUnit = 0;

	constructor(
		isbn: string,
		imgRef: string,
		title: string,
		author: string,
		releaseDate: string,
		grossPricePerUnit: number,
		inOffer: boolean,
		discountPercentage: number,
		hasIva: boolean,
		cant: number,
	) {
		super(isbn, imgRef, title, author, releaseDate, grossPricePerUnit, inOffer, discountPercentage, hasIva);
		this.cant = cant;
		this.calculate();
	}

	public calculate() {
		const discountPercentage = this.getDiscountPercentage();
		const ivaPercentage = this.getIvaPercentage();
		const grossPricePerUnit = this.getGrossPricePerUnit();
		// Calc Per Unit
		this.discountedAmount = (discountPercentage * grossPricePerUnit) / 100;
		this.ivaAmount = (ivaPercentage * grossPricePerUnit) / 100;
		this.priceWithDiscount = grossPricePerUnit - this.discountedAmount;
		this.priceWithIva = grossPricePerUnit + this.ivaAmount;
		this.priceCalcPerUnit = grossPricePerUnit - this.discountedAmount + this.ivaAmount;
	}

	// Getters
	public getDiscountedAmount(): number {
		return this.discountedAmount;
	}
	public getIvaAmount(): number {
		return this.ivaAmount;
	}
	public getPriceWithDiscount(): number {
		return this.priceWithDiscount;
	}
	public getPriceWithIva(): number {
		return this.priceWithIva;
	}
	public getCant(): number {
		return this.cant;
	}
	public getPriceCalcPerUnit(): number {
		return this.priceCalcPerUnit;
	}

	// Setters
	public setCant(cant: number) {
		this.cant = cant;
		this.calculate();
	}
}
