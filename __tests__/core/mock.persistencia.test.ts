import Admin from "../../src/core/entities/Admin";
import BillingInfo from "../../src/core/entities/BillingInfo";
import Card from "../../src/core/entities/Card";
import Client from "../../src/core/entities/Client";
import StockBook from "../../src/core/entities/StockBook";
import Transaction from "../../src/core/entities/Transaction";
import IPersistenciaClient from "../../src/core/ports/persistencia/IPersistenciaClient";
import IPersistenciaCuenta from "../../src/core/ports/persistencia/IPersistenciaCuenta";
import IPersistenciaLibro from "../../src/core/ports/persistencia/IPersistenciaLibro";

export const iPersistenciaCuenta: IPersistenciaCuenta = {
	guardarCuentaNueva: function (admin: Admin): Admin {
		if (admin.getUser() === "") return new Admin("", "", "", "", "");
		if (admin.getName() === "") return new Admin("", "", "", "", "");
		if (admin.getEmail() === "") return new Admin("", "", "", "", "");
		if (admin.getMobile() === "") return new Admin("", "", "", "", "");
		if (admin.getPassword() === "") return new Admin("", "", "", "", "");
		return admin;
	},
	obtenerCuenta: function (admin: Admin): Admin | null {
		if (admin.getUser() === "") return null;
		if (admin.getName() === "") return null;
		if (admin.getEmail() === "") return null;
		if (admin.getMobile() === "") return null;
		if (admin.getPassword() === "") return null;
		return admin;
	},
	actualizarCuenta: function (admin: Admin, originalAdminToChangeUsername?: Admin | undefined): Admin {
		if (originalAdminToChangeUsername !== undefined) admin.setUser(originalAdminToChangeUsername.getUser());
		return admin;
	},
	eliminarCuenta: function (admin: Admin): Admin {
		return admin;
	},
	compararPassword: function (admin: Admin): boolean {
		if (admin.getUser() === "") return false;
		if (admin.getPassword() === "") return false;
		return true;
	},
};

export const iPersistenciaClient: IPersistenciaClient = {
	guardarCuentaNueva: function (client: Client): Client {
		if (client.getUser() === "") return new Client("", "", "", "", "");
		if (client.getName() === "") return new Client("", "", "", "", "");
		if (client.getEmail() === "") return new Client("", "", "", "", "");
		if (client.getMobile() === "") return new Client("", "", "", "", "");
		if (client.getPassword() === "") return new Client("", "", "", "", "");
		return client;
	},
	obtenerCuenta: function (client: Client): Client | null {
		if (client.getUser() === "") return null;
		if (client.getName() === "") return null;
		if (client.getEmail() === "") return null;
		if (client.getMobile() === "") return null;
		if (client.getPassword() === "") return null;
		return client;
	},
	actualizarCuenta: function (client: Client, originalClientToChangeUsername?: Client | undefined): Client {
		if (originalClientToChangeUsername !== undefined) client.setUser(originalClientToChangeUsername.getUser());
		return client;
	},
	eliminarCuenta: function (client: Client): Client {
		return client;
	},
	compararPassword: function (client: Client): boolean {
		if (client.getUser() === "") return false;
		if (client.getPassword() === "") return false;
		return true;
	},

	actualizarBillingInfo: function (client: Client, billingInfo: BillingInfo): boolean {
		throw new Error("Function not implemented.");
	},
	agregarCard: function (client: Client, card: Card): boolean {
		throw new Error("Function not implemented.");
	},
	eliminarCard: function (client: Client, card: Card): boolean {
		throw new Error("Function not implemented.");
	},
	agregarTransaction: function (client: Client, transaction: Transaction): boolean {
		throw new Error("Function not implemented.");
	},
};

export const iPersistenciaLibro: IPersistenciaLibro = {
	buscarUnLibroPorISBN: function (isbn: string): StockBook | null {
		throw new Error("Function not implemented.");
	},
	filtrarLibros: function (searchString: String): StockBook[] {
		throw new Error("Function not implemented.");
	},
	guardarLibroNuevo: function (stockBook: StockBook): StockBook {
		throw new Error("Function not implemented.");
	},
	obtenerLibrosEnStock: function (): StockBook[] {
		throw new Error("Function not implemented.");
	},
	obtenerLibrosVisibles: function (): StockBook[] {
		return [
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
		];
	},
	actualizarLibro: function (stockBook: StockBook, originalStockBookToChangeISBN?: StockBook | undefined): StockBook {
		throw new Error("Function not implemented.");
	},
	eliminarLibro: function (stockBook: StockBook): StockBook {
		throw new Error("Function not implemented.");
	},
};
