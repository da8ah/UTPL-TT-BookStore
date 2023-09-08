import Admin from "../core/entities/Admin";
import BillingInfo from "../core/entities/BillingInfo";
import Card from "../core/entities/Card";
import CardTransaction from "../core/entities/CardTransaction";
import Cart from "../core/entities/Cart";
import Client from "../core/entities/Client";
import StockBook from "../core/entities/StockBook";
import ToBuyBook from "../core/entities/ToBuyBook";
import AdminModel, { IAdminModel } from "../services/database/models/AdminModel";
import CardTransactionModel, { ICardTransactionModel } from "../services/database/models/CardTransactionModel";
import ClientModel, { IBillingInfoModel, ICardModel, IClientModel } from "../services/database/models/ClientModel";
import StockBookModel, { IStockBookModel } from "../services/database/models/StockBookModel";

export class AdminCaster {
	public static adminToModel(admin: Admin): IAdminModel {
		return new AdminModel({
			user: admin.getUser().toLowerCase(),
			name: admin.getName(),
			email: admin.getEmail(),
			mobile: admin.getMobile(),
			password: admin.getPassword(),
		});
	}
	public static modelToAdmin(admin: IAdminModel): Admin {
		return new Admin(admin.user, admin.name, admin.email, admin.mobile, admin.password);
	}
}

export class ClientCaster {
	private static modelToBillingInfo(iBillingInfo: IBillingInfoModel): BillingInfo {
		return new BillingInfo(iBillingInfo.toWhom, iBillingInfo.ci, iBillingInfo.provincia, iBillingInfo.ciudad, iBillingInfo.numCasa, iBillingInfo.calles);
	}
	private static modelToCard(iCard: ICardModel): Card {
		return new Card(iCard.ownerName, iCard.cardNumber, iCard.code, iCard.expiryDate);
	}
	public static clientToModel(client: Client): IClientModel {
		return new ClientModel({
			user: client.getUser().toLowerCase(),
			name: client.getName(),
			email: client.getEmail(),
			mobile: client.getMobile(),
			password: client.getPassword(),
			billingInfo: client.getBillingInfo(),
			cards: client.getCards(),
			transactions: client.getTransactions().map((transaction) => transaction.getId()),
		});
	}
	public static modelToClient(client: IClientModel): Client {
		const newClient = new Client(client.user, client.name, client.email, client.mobile, client.password);
		if (client.billingInfo) newClient.setBillingInfo(this.modelToBillingInfo(client.billingInfo));
		if (client.cards && client.cards.length > 0) newClient.setCards(client.cards.map((card) => this.modelToCard(card)));
		return newClient;
	}
}

export class BookCaster {
	public static modelToBook(bookModel: IStockBookModel): StockBook {
		return new StockBook(
			bookModel.isbn,
			bookModel.imgRef,
			bookModel.title,
			bookModel.author,
			bookModel.releaseDate,
			bookModel.createdDate,
			bookModel.description,
			bookModel.grossPricePerUnit,
			bookModel.inOffer,
			bookModel.discountPercentage,
			bookModel.hasIva,
			bookModel.stock,
			bookModel.visible,
			bookModel.recommended,
			bookModel.bestSeller,
			bookModel.recent,
		);
	}
	public static bookToModel(stockBook: StockBook): IStockBookModel {
		return new StockBookModel({
			isbn: stockBook.getIsbn(),
			imgRef: stockBook.getImgRef(),
			title: stockBook.getTitle(),
			author: stockBook.getAuthor(),
			releaseDate: stockBook.getReleaseDate(),
			grossPricePerUnit: stockBook.getGrossPricePerUnit(),
			inOffer: stockBook.isInOffer(),
			discountPercentage: stockBook.getDiscountPercentage(),
			hasIva: stockBook.itHasIva(),
			ivaPercentage: stockBook.getIvaPercentage(),
			createdDate: stockBook.getCreatedDate(),
			description: stockBook.getDescription(),
			stock: stockBook.getStock(),
			visible: stockBook.isVisible(),
			recommended: stockBook.isRecommended(),
			bestSeller: stockBook.isBestSeller(),
			recent: stockBook.isRecent(),
		});
	}
}

export class TransactionCaster {
	public static cardTransactionToModel(transaction: CardTransaction): ICardTransactionModel {
		return new CardTransactionModel({
			id: transaction.getId(),
			date: transaction.getDate(),
			payment: transaction.getPayment(),
			cardNumber: transaction.getCardNumber(),
			client: {
				user: transaction.getUser(),
				name: transaction.getName(),
				email: transaction.getEmail(),
				mobile: transaction.getMobile(),
			},
			booksAcquired: transaction.getCart()?.getToBuyBooks(),
			discountCalc: transaction.getCart()?.getDiscountCalc(),
			ivaCalc: transaction.getCart()?.getIvaCalc(),
			subtotal: transaction.getCart()?.getSubtotal(),
			totalPrice: transaction.getCart()?.getTotalPrice(),
		});
	}

	public static modelToCardTransaction(cardTransactionModel: ICardTransactionModel): CardTransaction {
		const books: ToBuyBook[] = cardTransactionModel.booksAcquired.map(
			(book) => new ToBuyBook(book.isbn, book.imgRef, book.title, book.author, book.releaseDate, book.grossPricePerUnit, book.inOffer, book.discountPercentage, book.hasIva, book.cant),
		);

		const cart = new Cart(books);

		const cardTransaction = new CardTransaction(
			cardTransactionModel.id,
			cardTransactionModel.cardNumber,
			cardTransactionModel.client.user,
			cardTransactionModel.client.name,
			cardTransactionModel.client.user,
			cardTransactionModel.client.mobile,
			cardTransactionModel.date,
			cardTransactionModel.payment,
			cart,
		);

		return cardTransaction;
	}
}
