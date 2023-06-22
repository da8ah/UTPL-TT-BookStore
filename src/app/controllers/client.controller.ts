import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Card from "../../core/entities/Card";
import Client from "../../core/entities/Client";
import GestionDeCuentaClient from "../../core/usecases/client/GestionDeCuentaClient";
import PersistenciaDeClient from "../../services/database/adapters/PersistenciaDeClient";
import { ClientConverter } from "../tools/casts";
import { InputValidator } from "../tools/validations";

export default class ClientController {
	private static decodeToken(authorization: string | undefined) {
		let tokenDecoded = null;
		if (authorization !== undefined) tokenDecoded = jwt.decode(authorization);
		return JSON.parse(JSON.stringify(tokenDecoded));
	}

	public authorizationVerification(req: Request, res: Response, next: NextFunction) {
		const tokenDecoded = ClientController.decodeToken(req?.headers.authorization);
		if (!tokenDecoded) return res.status(404).redirect("/signin");
		const user = tokenDecoded?.user;
		if (!user || user === undefined || req.params.user === undefined || user.toLowerCase() !== req.params.user.toLowerCase()) return res.status(401).send();
		next();
	}

	public async updateClient(req: Request, res: Response) {
		try {
			const clientToSearch = new Client(req.params.user, "", "", "", "");
			const clientToUpdate = ClientConverter.jsonToClient(req);
			if (!InputValidator.validateUser(clientToUpdate)) return res.status(400).json({ msg: "No valid input!" });
			if (!clientToUpdate.getBillingInfo() || clientToUpdate.getBillingInfo() === undefined || !InputValidator.validateBillingInfo(clientToUpdate.getBillingInfo()))
				return res.status(400).json({ msg: "No valid input!" });

			const resultado = await GestionDeCuentaClient.actualizarCuenta(new PersistenciaDeClient(), clientToUpdate);
			if (!resultado) return res.status(404).json({ msg: `${clientToSearch.getUser()} was not found!` });
			return res.status(200).json({ msg: `${clientToSearch.getUser()} updated!` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async updateBillingInfo(req: Request, res: Response) {
		try {
			const client = new Client(req.params.user, "", "", "", "");
			const billingInfo = ClientConverter.jsonToBillingInfo(req.body);
			if (!billingInfo || billingInfo === undefined || !InputValidator.validateBillingInfo(billingInfo)) return res.status(400).json({ msg: "No valid input!" });

			const resultado = await GestionDeCuentaClient.actualizarBillingInfo(new PersistenciaDeClient(), client, billingInfo);
			if (!resultado) return res.status(404).json({ msg: "Billing info was not updated!" });
			return res.status(200).json({ msg: "Billing info updated!" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async addCard(req: Request, res: Response) {
		try {
			const client = new Client(req.params.user, "", "", "", "");
			const card = ClientConverter.jsonToCard(req.body);
			// if (!InputValidator.validateCard(newCard)) return res.status(400).json({ msg: "No valid input!" });

			const resultado = await GestionDeCuentaClient.agregarCard(new PersistenciaDeClient(), client, card);
			if (!resultado) return res.status(400).json({ msg: "Card was not saved!" });
			return res.status(201).json({ msg: "Card saved!" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async rmCard(req: Request, res: Response) {
		try {
			const client = new Client(req.params.user, "", "", "", "");
			const cardToDelete = new Card("", req.body.cardNumber, "", "");
			const resultado = await GestionDeCuentaClient.eliminarCard(new PersistenciaDeClient(), client, cardToDelete);
			if (!resultado) return res.status(400).json({ msg: "Card was not deleted!" });
			return res.status(200).json({ msg: "Card deleted!" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async deleteClient(req: Request, res: Response) {
		try {
			const clientToDelete = new Client(req.params.user, "", "", "", "");
			const resultado = await GestionDeCuentaClient.eliminarCuenta(new PersistenciaDeClient(), clientToDelete);
			if (!resultado) return res.status(400).json({ msg: `${clientToDelete.getUser()} was not deleted!` });
			return res.status(200).json({ msg: `${clientToDelete.getUser()} deleted!` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}
}
