import Book from "./Book";

export default class StockBook extends Book {
	// Required
	private createdDate: string;
	private description: string;
	// Optional
	private stock = 0;
	private visible = false;
	private recommended = false;
	private bestSeller = false;
	private recent = false;

	constructor(
		isbn: string,
		imgRef: string,
		title: string,
		author: string,
		releaseDate: string,
		createdDate: string,
		description: string,
		grossPricePerUnit = 0,
		inOffer = false,
		discountPercentage = 0,
		hasIva = false,
		stock = 0,
		visible = false,
		recommended = false,
		bestSeller = false,
		recent = false,
	) {
		super(isbn, imgRef, title, author, releaseDate, grossPricePerUnit, inOffer, discountPercentage, hasIva);
		// Required
		this.createdDate = createdDate;
		this.description = description;
		// Optional
		this.setStock(stock); // Auto setStock if (0 < value)
		this.visible = visible;
		this.recommended = recommended;
		this.bestSeller = bestSeller;
		this.recent = recent;
	}

	public getCreatedDate(): string {
		return this.createdDate;
	}
	public setCreatedDate(createdDate: string) {
		this.createdDate = createdDate;
	}

	public getDescription(): string {
		return this.description;
	}
	public setDescription(description: string) {
		this.description = description;
	}

	public getStock(): number {
		return this.stock;
	}
	public setStock(stock: number) {
		if (stock > 0) this.stock = stock;
		else this.stock = 0;
	}

	public isVisible(): boolean {
		return this.visible;
	}
	public setVisible(visible: boolean) {
		this.visible = visible;
	}

	public isRecommended(): boolean {
		return this.recommended;
	}
	public setRecommended(recommended: boolean) {
		this.recommended = recommended;
	}

	public isBestSeller(): boolean {
		return this.bestSeller;
	}
	public setBestSeller(bestSeller: boolean) {
		this.bestSeller = bestSeller;
	}

	public isRecent(): boolean {
		return this.recent;
	}
	public setRecent(recent: boolean) {
		this.recent = recent;
	}
}
