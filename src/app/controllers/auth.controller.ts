import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Client from "../../core/entities/Client";
import GestionDeInicio from "../../core/usecases/GestionDeInicio";
import config from "../../config/config";
import { default as PersistenciaDeClient, default as PersistenciaDeCuentas } from "../../services/database/adapters/PersistenciaDeClient";
import { ClientConverter } from "../../utils/json.casts";
import { InputValidator } from "../../utils/validations";

export default class AuthController {
	private static createToken(client: Client) {
		if (config.jwtSecret) {
			return jwt.sign({ user: client.getUser(), email: client.getEmail() }, config.jwtSecret, { expiresIn: "7d" });
		}
	}

	private static decodeToken(authorization: string | undefined) {
		let tokenDecoded = null;
		if (authorization !== undefined) tokenDecoded = jwt.decode(authorization);
		return JSON.parse(JSON.stringify(tokenDecoded));
	}

	public async signUp(req: Request, res: Response) {
		try {
			const newClient = ClientConverter.jsonToClient(req);
			if (!InputValidator.validateUser(newClient)) return res.status(400).json({ msg: "No valid input!" });
			if (!InputValidator.validateBillingInfo(newClient.getBillingInfo())) return res.status(400).json({ msg: "No valid input!" });

			const resultado = await GestionDeInicio.crearCuenta(new PersistenciaDeClient(), newClient);
			if (resultado.duplicado) return res.status(303).json({ msg: `${newClient.getUser()} already exists!` });
			if (!resultado.creado) return res.status(400).json({ msg: `${newClient.getUser()} was not saved!` });
			return res.status(201).json({ msg: `${newClient.getUser()} saved!` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async logIn(req: Request, res: Response) {
		try {
			const { user, password } = req.body;
			if (!(user && password) || user === "" || password === "") return res.status(400).json({ msg: "No valid input!" });

			const client = ClientConverter.jsonToClient(req);
			const resultado = await GestionDeInicio.iniciarSesionConUserPassword(new PersistenciaDeCuentas(), client);
			if (!resultado) return res.status(404).json({ msg: `${client.getUser()} was not found!` });

			const tokenCreated = AuthController.createToken(resultado);

			return res
				.status(200)
				.cookie("jwt", tokenCreated, {
					expires: new Date(Date.now() + 900000),
					httpOnly: true,
				})
				.send(resultado);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async logOut(req: Request, res: Response, next: NextFunction) {
		try {
			req.logout(function (err) {
				if (err) {
					return next(err);
				}
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async getClientWithToken(req: Request, res: Response) {
		try {
			const tokenDecoded = AuthController.decodeToken(req?.headers.authorization);
			if (!tokenDecoded) return res.status(400).json({ msg: "No valid input!" });
			const user = tokenDecoded.user;
			const client = new Client(user, "", "", "", "");
			const resultado = await GestionDeInicio.iniciarSesionConUser(new PersistenciaDeCuentas(), client);
			if (!resultado) return res.status(404).json({ msg: `${client.getUser()} was not found!` });
			return res.status(200).json(resultado);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}
}
