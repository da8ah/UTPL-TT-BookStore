import GestionDeAdmin from "../../src/core/usecases/admin/GestionDeAdmin";
import GestionDeInicio from "../../src/core/usecases/GestionDeInicio";
import { iPersistenciaClient, iPersistenciaCuenta, iPersistenciaLibro } from "./mock.persistencia.test";

import Admin from "../../src/core/entities/Admin";
import BillingInfo from "../../src/core/entities/BillingInfo";
import Card from "../../src/core/entities/Card";
import Cart from "../../src/core/entities/Cart";
import Client from "../../src/core/entities/Client";
import StockBook from "../../src/core/entities/StockBook";
import ToBuyBook from "../../src/core/entities/ToBuyBook";

let admin: Admin;
let billingInfo: BillingInfo;
let client: Client;
let stockBook: StockBook;
let toBuyBook: ToBuyBook;
let cart: Cart;

// Tests
beforeAll(() => {
	admin = new Admin("tiber", "tiber", "tiber@email.com", "+593000000000", "tiber");
	billingInfo = new BillingInfo("da8ah.tiber", "1000000001", "Loja", "Loja", "000", "Principal y Secundaria");
	client = new Client("da8ah.tiber", "da8ah.tiber", "da8ah.tiber@email.com", "+593000000001", "da8ah.tiber", billingInfo);
	client.setCards([new Card("da8ah.tiber", "0000", "123", new Date().toLocaleDateString())]);

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

describe("Test Domain Use Cases", () => {
	describe("Admin", () => {
		it("should crearCuenta", () => {
			const adminSaved = GestionDeAdmin.crearCuenta(iPersistenciaCuenta, admin);
			expect(adminSaved).toEqual(new Admin("tiber", "tiber", "tiber@email.com", "+593000000000", ""));
		});

		it("should iniciarSesionConUserPassword", () => {
			const adminFound = GestionDeAdmin.iniciarSesionConUserPassword(iPersistenciaCuenta, admin);
			expect(adminFound).toEqual(new Admin("tiber", "tiber", "tiber@email.com", "+593000000000", ""));
		});

		it("should iniciarSesionConUser", () => {
			const adminFound = GestionDeAdmin.iniciarSesionConUser(iPersistenciaCuenta, admin);
			expect(adminFound).toEqual(new Admin("tiber", "tiber", "tiber@email.com", "+593000000000", ""));
		});

		it("should actualizarCuenta", () => {
			const adminFound = GestionDeAdmin.actualizarCuenta(iPersistenciaCuenta, new Admin("tiber", "tiber", "tiber@email.com", "+593000000000", "1234"));
			expect(adminFound).toEqual(new Admin("tiber", "tiber", "tiber@email.com", "+593000000000", ""));
		});

		it("should eliminarCuenta", () => {
			const adminFound = GestionDeAdmin.eliminarCuenta(iPersistenciaCuenta, admin);
			expect(adminFound).toEqual(new Admin("tiber", "tiber", "tiber@email.com", "+593000000000", ""));
		});
	});

	describe("Client", () => {
		it("should crearCuenta", () => {
			const clientSaved = GestionDeInicio.crearCuenta(iPersistenciaClient, client);
			expect(clientSaved).toMatchObject({ user: "da8ah.tiber", name: "da8ah.tiber", email: "da8ah.tiber@email.com", mobile: "+593000000001", password: "" });
		});
	});

	describe("Inicio", () => {
		it("should fetch all Visible StockBooks", () => {
			const books = GestionDeInicio.listarCatalogoDeLibrosVisibles(iPersistenciaLibro);
			expect(books).toEqual([
				new StockBook(
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
				),
			]);
		});
	});
});
