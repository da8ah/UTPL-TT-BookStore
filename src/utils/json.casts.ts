import Admin from "../core/entities/Admin";
import BillingInfo from "../core/entities/BillingInfo";
import Card from "../core/entities/Card";
import CardTransaction from "../core/entities/CardTransaction";
import Cart from "../core/entities/Cart";
import Client from "../core/entities/Client";
import StockBook from "../core/entities/StockBook";
import ToBuyBook from "../core/entities/ToBuyBook";

export enum AdminEnum {
	USER = "user",
	NAME = "name",
	EMAIL = "email",
	MOBILE = "mobile",
	PASSWORD = "password",
}

export class AdminConverter {
	public static adminToJSON(admin: Admin): JSON {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const json: any = {};
		if (admin.getUser() !== undefined) json[AdminEnum.USER] = admin.getUser().toLowerCase();
		if (admin.getName() !== undefined) json[AdminEnum.NAME] = admin.getName();
		if (admin.getEmail() !== undefined) json[AdminEnum.EMAIL] = admin.getEmail();
		if (admin.getMobile() !== undefined) json[AdminEnum.MOBILE] = admin.getMobile();
		if (admin.getPassword() !== undefined) json[AdminEnum.PASSWORD] = admin.getPassword();
		return json;
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToAdmin(req: any): Admin {
		const { user, name, email, mobile, password } = req.body;
		const admin = new Admin(user, name, email, mobile, password);
		return admin;
	}
}

export enum ClientEnum {
	USER = "user",
	NAME = "name",
	EMAIL = "email",
	MOBILE = "mobile",
	PASSWORD = "password",
	BILLING_INFO = "BillingInfo",
	CARDS = "cards",
	TRANSACTIONS = "transactions",
}

export enum BillingInfoEnum {
	TO_WHOM = "billingInfo.toWhom",
	CI = "billingInfo.ci",
	PROVINCIA = "billingInfo.provincia",
	CIUDAD = "billingInfo.ciudad",
	NUM_CASA = "billingInfo.numCasa",
	CALLES = "billingInfo.calles",
}

export enum CardEnum {
	OWNER_NAME = "ownerName",
	CARD_NUMBER = "cardNumber",
	CODE = "code",
	EXPIRY_DATE = "expiryDate",
}

export class ClientConverter {
	public static billingInfoToJSON(billingInfo: BillingInfo): JSON {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const json: any = {};
		if (billingInfo.getToWhom() !== undefined) json[BillingInfoEnum.TO_WHOM] = billingInfo.getToWhom();
		if (billingInfo.getCi() !== undefined) json[BillingInfoEnum.CI] = billingInfo.getCi();
		if (billingInfo.getProvincia() !== undefined) json[BillingInfoEnum.PROVINCIA] = billingInfo.getProvincia();
		if (billingInfo.getCiudad() !== undefined) json[BillingInfoEnum.CIUDAD] = billingInfo.getCiudad();
		if (billingInfo.getNumCasa() !== undefined) json[BillingInfoEnum.NUM_CASA] = billingInfo.getNumCasa();
		if (billingInfo.getCalles() !== undefined) json[BillingInfoEnum.CALLES] = billingInfo.getCalles();
		return json;
	}

	public static cardToJSON(card: Card): JSON {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const json: any = {};
		if (card.getOwnerName() !== undefined) json[CardEnum.OWNER_NAME] = card.getOwnerName();
		if (card.getCardNumber() !== undefined) json[CardEnum.CARD_NUMBER] = card.getCardNumber();
		if (card.getCode() !== undefined) json[CardEnum.CODE] = card.getCode();
		if (card.getExpiryDate() !== undefined) json[CardEnum.EXPIRY_DATE] = card.getExpiryDate();
		return json;
	}

	public static clientToJSON(client: Client): JSON {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const json: any = {};
		if (client.getUser() !== undefined) json[ClientEnum.USER] = client.getUser().toLowerCase();
		if (client.getName() !== undefined) json[ClientEnum.NAME] = client.getName();
		if (client.getEmail() !== undefined) json[ClientEnum.EMAIL] = client.getEmail();
		if (client.getMobile() !== undefined) json[ClientEnum.MOBILE] = client.getMobile();
		if (client.getPassword() !== undefined) json[ClientEnum.PASSWORD] = client.getPassword();

		const billingInfo = client.getBillingInfo();
		if (billingInfo !== undefined) json[ClientEnum.BILLING_INFO] = this.billingInfoToJSON(billingInfo);
		const cards = client.getCards();
		if (cards !== undefined) json[ClientEnum.CARDS] = cards.map((card) => this.cardToJSON(card));
		const transactions = client.getTransactions();
		if (transactions !== undefined) json[ClientEnum.TRANSACTIONS] = transactions.map((transaction) => TransactionConverter.cardTransactionToJSON(transaction as CardTransaction));

		return json;
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToBillingInfo(req: any): BillingInfo {
		const { toWhom, ci, provincia, ciudad, numCasa, calles } = req;
		return new BillingInfo(toWhom, ci, provincia, ciudad, numCasa, calles);
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToCard(req: any): Card {
		const { ownerName, cardNumber, code, expiryDate } = req;
		return new Card(ownerName, cardNumber, code, expiryDate);
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToClient(req: any): Client {
		const { user, name, email, mobile, password, billingInfo } = req.body;

		const client = new Client(user, name, email, mobile, password);

		if (billingInfo) client.setBillingInfo(this.jsonToBillingInfo(billingInfo));

		return client;
	}
}

export enum StockBookEnum {
	ISBN = "isbn",
	IMG_REF = "imgRef",
	TITLE = "title",
	AUTHOR = "author",
	RELEASE_DATE = "releaseDate",
	CREATED_DATE = "createdDate",
	DESCRIPTION = "description",
	GROSS_PRICE_PER_UNIT = "grossPricePerUnit",
	IN_OFFER = "inOffer",
	DISCOUNT_PERCENTAGE = "discountPercentage",
	HAS_IVA = "hasIva",
	IVA_PERCENTAGE = "ivaPercentage",
	STOCK = "stock",
	VISIBLE = "visible",
	RECOMMENDED = "recommended",
	BEST_SELLER = "bestSeller",
	RECENT = "recent",
}

export class BookConverter {
	public static bookToJSON(stockBook: StockBook): JSON {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const json: any = {};
		if (stockBook.getIsbn() !== undefined) json[StockBookEnum.ISBN] = stockBook.getIsbn();
		if (stockBook.getImgRef() !== undefined) json[StockBookEnum.IMG_REF] = stockBook.getImgRef();
		if (stockBook.getTitle() !== undefined) json[StockBookEnum.TITLE] = stockBook.getTitle();
		if (stockBook.getAuthor() !== undefined) json[StockBookEnum.AUTHOR] = stockBook.getAuthor();
		if (stockBook.getReleaseDate() !== undefined) json[StockBookEnum.RELEASE_DATE] = stockBook.getReleaseDate();
		if (stockBook.getCreatedDate() !== undefined) json[StockBookEnum.CREATED_DATE] = stockBook.getCreatedDate();
		if (stockBook.getDescription() !== undefined) json[StockBookEnum.DESCRIPTION] = stockBook.getDescription();
		if (stockBook.getGrossPricePerUnit() !== undefined) json[StockBookEnum.GROSS_PRICE_PER_UNIT] = stockBook.getGrossPricePerUnit();
		if (stockBook.isInOffer() !== undefined) json[StockBookEnum.IN_OFFER] = stockBook.isInOffer();
		if (stockBook.getDiscountPercentage() !== undefined) json[StockBookEnum.DISCOUNT_PERCENTAGE] = stockBook.getDiscountPercentage();
		if (stockBook.itHasIva() !== undefined) json[StockBookEnum.HAS_IVA] = stockBook.itHasIva();
		if (stockBook.getIvaPercentage() !== undefined) json[StockBookEnum.IVA_PERCENTAGE] = stockBook.getIvaPercentage();
		if (stockBook.getStock() !== undefined) json[StockBookEnum.STOCK] = stockBook.getStock();
		if (stockBook.isVisible() !== undefined) json[StockBookEnum.VISIBLE] = stockBook.isVisible();
		if (stockBook.isRecommended() !== undefined) json[StockBookEnum.RECOMMENDED] = stockBook.isRecommended();
		if (stockBook.isBestSeller() !== undefined) json[StockBookEnum.BEST_SELLER] = stockBook.isBestSeller();
		if (stockBook.isRecent() !== undefined) json[StockBookEnum.RECENT] = stockBook.isRecent();
		return json;
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToBook(req: any): StockBook {
		// All Attrs from body
		const { isbn, imgRef, title, author, releaseDate, createdDate, description, grossPricePerUnit, inOffer, discountPercentage, hasIva, stock, visible, recommended, bestSeller, recent } = req.body;
		// NewStockBook with all Attrs
		return new StockBook(isbn, imgRef, title, author, releaseDate, createdDate, description, grossPricePerUnit, inOffer, discountPercentage, hasIva, stock, visible, recommended, bestSeller, recent);
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToBuyBooks(req: any): ToBuyBook[] {
		const books: ToBuyBook[] = [];

		req.body.map(
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			(book: any) =>
				books.push(new ToBuyBook(book.isbn, book.imgRef, book.title, book.author, book.releaseDate, book.grossPricePerUnit, book.inOffer, book.discountPercentage, book.hasIva, book.cant)),
		);

		return books;
	}
}

export enum TransactionEnum {
	ID = "id",
	CARD_NUMBER = "cardNumber",
	DATE = "date",
	PAYMENT = "payment",
	CART = "cart",
}

export class TransactionConverter {
	static cardTransactionToJSON(cardTransaction: CardTransaction): JSON {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const json: any = {};
		if (cardTransaction.getId() !== undefined) json[TransactionEnum.ID] = cardTransaction.getId();
		if (cardTransaction.getCardNumber() !== undefined) json[TransactionEnum.CARD_NUMBER] = cardTransaction.getCardNumber();
		if (cardTransaction.getDate() !== undefined) json[TransactionEnum.DATE] = cardTransaction.getDate();
		if (cardTransaction.getPayment() !== undefined) json[TransactionEnum.PAYMENT] = cardTransaction.getPayment();
		if (cardTransaction.getCart() !== undefined) json[TransactionEnum.CART] = JSON.parse(JSON.stringify(cardTransaction.getCart()));
		return json;
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToCardTransaction(req: any): CardTransaction {
		const { id, cardNumber, user, name, email, mobile, date, payment, cart } = req.body;

		const { discountCalc, ivaCalc, subtotal, totalPrice, toBuyBooks } = cart;

		const books = toBuyBooks.map(
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			(book: any) => new ToBuyBook(book.isbn, book.imgRef, book.title, book.author, book.releaseDate, book.grossPricePerUnit, book.inOffer, book.discountPercentage, book.hasIva, book.cant),
		);

		const newCart = new Cart(books);
		console.log(`Total: ${totalPrice} ${newCart.getTotalPrice()}`);

		return new CardTransaction(id, cardNumber, user, name, email, mobile, date, payment, newCart);
	}
}
