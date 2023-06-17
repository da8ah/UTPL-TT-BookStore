import Admin from "../../src/core/entities/Admin";
import BillingInfo from "../../src/core/entities/BillingInfo";
import Card from "../../src/core/entities/Card";
import Cart from "../../src/core/entities/Cart";
import Client from "../../src/core/entities/Client";
import StockBook from "../../src/core/entities/StockBook";
import ToBuyBook from "../../src/core/entities/ToBuyBook";
import TransactionFactory from "../../src/core/entities/TransactionFactory";

let admin: Admin;
let billingInfo: BillingInfo;
let client: Client;
let stockBook: StockBook;
let toBuyBook: ToBuyBook;
let cart: Cart;

// Tests
beforeAll(() => {
	admin = new Admin("tiber", "da8ah", "tiber@email.com", "+593000000001", "tiber");
	billingInfo = new BillingInfo("tiber", "1000000001", "Loja", "Loja", "000", "Principal y Secundaria");
	client = new Client("tiber", "da8ah", "tiber@email.com", "+593000000001", "tiber", billingInfo);
	client.setCards([new Card("da8ah", "0000", "123", new Date().toLocaleDateString())]);

	stockBook = new StockBook(
		"9780141988511",
		"https://azure.blob.url.jpg",
		"12 Rules for Life: An Antidote to Chaos",
		"Jordan Peterson",
		"12/01/2018",
		"10/01/2023",
		"JBP's BestSeller",
		25,
		true,
		10,
		false,
		100,
		true,
		true,
		true,
		false,
	);

	toBuyBook = new ToBuyBook(
		stockBook.getIsbn(),
		stockBook.getImgRef(),
		stockBook.getTitle(),
		stockBook.getAuthor(),
		stockBook.getReleaseDate(),
		stockBook.getGrossPricePerUnit(),
		stockBook.isInOffer(),
		stockBook.getDiscountPercentage(),
		stockBook.itHasIva(),
		1,
	);

	cart = new Cart([toBuyBook]);
});

describe("Test Domain Entities", () => {
	describe("Instanciation", () => {
		it("should instanciate Admin", () => {
			expect(admin).toBeInstanceOf(Admin);
		});
		it("should check instanceof Admin eq class Admin", () => {
			expect(admin.constructor.name === Admin.name).toBe(true);
		});
		it("should instanciate BillingInfo", () => {
			expect(billingInfo).toBeInstanceOf(BillingInfo);
		});
		it("should instanciate Client", () => {
			expect(client).toBeInstanceOf(Client);
		});

		it("should add ToBuyBook to Cart and recalculate", () => {
			expect(cart.getSubtotal()).toBe(25);
			expect(cart.getTotalPrice()).toBe(22.5);

			cart.addToBuyBook(toBuyBook);
			expect(cart.getSubtotal()).toBe(50);
			expect(cart.getTotalPrice()).toBe(45);
		});

		it("should rm ToBuyBook from Cart and recalculate", () => {
			expect(cart.getSubtotal()).toBe(50);
			expect(cart.getTotalPrice()).toBe(45);

			cart.rmToBuyBook(toBuyBook);
			expect(cart.getSubtotal()).toBe(25);
			expect(cart.getTotalPrice()).toBe(22.5);
		});
	});

	describe("Transaction", () => {
		it("should reduce stock from 100 to 99", () => {
			expect(stockBook.getStock()).toBe(100);
			const t1 = new TransactionFactory().createTransaction();
			if (!t1 || client.getCards().length === 0) return;
			t1.setCardNumber(client.getCards()[0].getCardNumber() || "");
			t1.setId("id");
			t1.setUser(client.getUser());
			t1.setName(client.getName());
			t1.setEmail(client.getEmail());
			t1.setMobile(client.getMobile());
			t1.setDate(new Date().toLocaleDateString());
			t1.setPayment(cart.getTotalPrice());
			t1.setCart(cart);

			stockBook.setStock(stockBook.getStock() - toBuyBook.getCant());
			expect(stockBook.getStock()).toBe(99);
		});
	});
});
