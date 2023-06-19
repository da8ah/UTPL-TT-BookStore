import Admin from "../../src/core/entities/Admin";
import BillingInfo from "../../src/core/entities/BillingInfo";
import Card from "../../src/core/entities/Card";
import Client from "../../src/core/entities/Client";
import StockBook from "../../src/core/entities/StockBook";
import Transaction from "../../src/core/entities/Transaction";
import IPersistenciaClient from "../../src/core/ports/persistencia/IPersistenciaClient";
import IPersistenciaCuenta from "../../src/core/ports/persistencia/IPersistenciaCuenta";
import IPersistenciaLibro from "../../src/core/ports/persistencia/IPersistenciaLibro";

import { admin as adminTest } from "./core.usecases.test";

export const iPersistenciaCuenta: IPersistenciaCuenta = {
	guardarCuentaNueva: async (admin: Admin): Promise<boolean> => {
		if (admin.getUser() === "") return false;
		if (admin.getName() === "") return false;
		if (admin.getEmail() === "") return false;
		if (admin.getMobile() === "") return false;
		if (admin.getPassword() === "") return false;
		return true;
	},
	comprobarCuentaDuplicada: async (admin: Admin): Promise<boolean> => {
		return false;
	},
	obtenerCuenta: async (admin: Admin): Promise<Admin | null> => {
		if (admin.getUser() === "") return null;
		return adminTest;
	},
	comprobarUserPassword: async (admin: Admin): Promise<boolean> => {
		if (admin.getUser() === "") return false;
		if (admin.getPassword() === "") return false;
		return true;
	},
	actualizarCuenta: async (admin: Admin, originalAdminToChangeUsername?: Admin | undefined): Promise<boolean> => {
		if (originalAdminToChangeUsername !== undefined) admin.setUser(originalAdminToChangeUsername.getUser());
		return true;
	},
	eliminarCuenta: async (admin: Admin): Promise<boolean> => {
		return true;
	},
};

export const iPersistenciaClient: IPersistenciaClient = {
	guardarCuentaNueva: async (client: Client): Promise<boolean> => {
		if (client.getUser() === "") return false;
		if (client.getName() === "") return false;
		if (client.getEmail() === "") return false;
		if (client.getMobile() === "") return false;
		if (client.getPassword() === "") return false;
		return true;
	},
	comprobarCuentaDuplicada: async (client: Client): Promise<boolean> => {
		return false;
	},
	obtenerCuenta: async (client: Client): Promise<Client | null> => {
		if (client.getUser() === "") return null;
		return client;
	},
	comprobarUserPassword: async (client: Client): Promise<boolean> => {
		if (client.getUser() === "") return false;
		if (client.getPassword() === "") return false;
		return true;
	},
	actualizarCuenta: async (client: Client, originalClientToChangeUsername?: Client | undefined): Promise<boolean> => {
		if (originalClientToChangeUsername !== undefined) client.setUser(originalClientToChangeUsername.getUser());
		return true;
	},
	eliminarCuenta: async (client: Client): Promise<boolean> => {
		return true;
	},
	actualizarBillingInfo: async (client: Client, billingInfo: BillingInfo): Promise<boolean> => {
		throw new Error("async not implemented.");
	},
	agregarCard: async (client: Client, card: Card): Promise<boolean> => {
		throw new Error("async not implemented.");
	},
	eliminarCard: async (client: Client, card: Card): Promise<boolean> => {
		throw new Error("async not implemented.");
	},
	agregarTransaction: async (client: Client, transaction: Transaction): Promise<boolean> => {
		throw new Error("Function not implemented.");
	},
};

export const iPersistenciaLibro: IPersistenciaLibro = {
	buscarUnLibroPorISBN: function (isbn: string): Promise<StockBook | null> {
		throw new Error("Function not implemented.");
	},
	guardarLibroNuevo: function (stockBook: StockBook): Promise<boolean> {
		throw new Error("Function not implemented.");
	},
	obtenerLibrosEnStock: function (): Promise<StockBook[]> {
		throw new Error("Function not implemented.");
	},
	obtenerLibrosVisibles: async (): Promise<StockBook[]> => {
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
	actualizarLibro: function (stockBook: StockBook, originalStockBookToChangeISBN?: StockBook | undefined): Promise<boolean> {
		throw new Error("Function not implemented.");
	},
	eliminarLibro: function (stockBook: StockBook): Promise<boolean> {
		throw new Error("Function not implemented.");
	},
};
