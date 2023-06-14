export default abstract class Book {
	// Required
	private isbn: string;
	private imgRef: string;
	private title: string;
	private author: string;
	private releaseDate: string;
	// Optional
	private grossPricePerUnit = 0;
	private inOffer = false;
	private discountPercentage = 0;
	private hasIva = false;
	private ivaPercentage: 0 | 12 = 0;

	constructor(isbn: string, imgRef: string, title: string, author: string, releaseDate: string, grossPricePerUnit = 0, inOffer = false, discountPercentage = 0, hasIva = false) {
		// Required
		this.isbn = isbn;
		this.imgRef = imgRef;
		this.title = title;
		this.author = author;
		this.releaseDate = releaseDate;

		// Optional
		if (grossPricePerUnit === 0 && inOffer === false && discountPercentage === 0 && hasIva === false) return;

		// Auto setGrossPricePerUnit if (0 < value)
		this.setGrossPricePerUnit(grossPricePerUnit);
		// No dependencies (no if statements)
		this.inOffer = inOffer;
		// Auto setDiscountPercentage if this.inOffer = true && (0 < value <= 100)
		this.setDiscountPercentage(discountPercentage);
		// Auto setIvaPercentage to 12 if this.hasIva = true | to 0 if this.hasIva = false
		this.setHasIva(hasIva);
	}

	// REQUIRED
	// Getters
	public getIsbn(): string {
		return this.isbn;
	}
	public getImgRef(): string {
		return this.imgRef;
	}
	public getTitle(): string {
		return this.title;
	}
	public getAuthor(): string {
		return this.author;
	}
	public getReleaseDate(): string {
		return this.releaseDate;
	}

	// Setters
	public setIsbn(isbn: string) {
		this.isbn = isbn;
	}
	public setImgRef(imgRef: string) {
		this.imgRef = imgRef;
	}
	public setTitle(title: string) {
		this.title = title;
	}
	public setAuthor(author: string) {
		this.author = author;
	}
	public setReleaseDate(releaseDate: string) {
		this.releaseDate = releaseDate;
	}

	// OPTIONAL - (GrossPricePerUnit, Offer, DiscountPercentage, IVA, IvaPercentage)
	public getGrossPricePerUnit(): number {
		return this.grossPricePerUnit;
	}
	public setGrossPricePerUnit(grossPricePerUnit: number) {
		if (grossPricePerUnit > 0) this.grossPricePerUnit = grossPricePerUnit;
		else this.grossPricePerUnit = 0;
	}

	public isInOffer(): boolean {
		return this.inOffer;
	}
	public setInOffer(inOffer: boolean) {
		this.inOffer = inOffer;
	}

	public getDiscountPercentage(): number {
		return this.discountPercentage;
	}
	public setDiscountPercentage(discountPercentage: number) {
		// if this.inOffer = false then this.discountPercentage = 0;
		// else this.inOffer = true && (0 < value <= 100); then this.discountPercentage = value;
		if (!this.inOffer) {
			this.discountPercentage = 0;
			return;
		}

		if (discountPercentage > 0 && discountPercentage <= 100) this.discountPercentage = discountPercentage;
		else this.discountPercentage = 0;
	}

	public itHasIva(): boolean {
		return this.hasIva;
	}
	public setHasIva(hasIva: boolean) {
		// if this.hasIva = false; then this.ivaPercentage = 0;
		// else this.ivaPercentage = 12;
		this.hasIva = hasIva;
		if (!hasIva) {
			this.setIvaPercentage(0);
			return;
		}

		this.setIvaPercentage(1);
	}

	public getIvaPercentage(): number {
		return this.ivaPercentage;
	}
	private setIvaPercentage(option: 0 | 1) {
		switch (option) {
			case 0:
				this.ivaPercentage = 0;
				break;
			case 1:
				this.ivaPercentage = 12;
				break;
		}
	}
}
