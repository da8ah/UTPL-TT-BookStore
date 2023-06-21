import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Admin from "../../core/entities/Admin";
import GestionDeAdmin from "../../core/usecases/admin/GestionDeAdmin";
import GestionDeTransacciones from "../../core/usecases/admin/GestionDeTransacciones";
import config from "../../config/config";
import PersistenciaDeAdmin from "../../services/database/adapters/PersistenciaDeAdmin";
import PersistenciaDeTransacciones from "../../services/database/adapters/PersistenciaDeTransacciones";
import { InputValidator } from "../tools/validations";
import { AdminConverter } from "../tools/casts";

export default class AdminController {
	private static createToken(admin: Admin) {
		if (config.jwtSecret) {
			return jwt.sign({ user: admin.getUser(), email: admin.getEmail(), role: "Admin" }, config.jwtSecret, { expiresIn: "3d" });
		}
	}

	private static decodeToken(authorization: string | undefined) {
		let tokenDecoded = null;
		if (authorization !== undefined) tokenDecoded = jwt.decode(authorization);
		return JSON.parse(JSON.stringify(tokenDecoded));
	}

	public roleVerification(req: Request, res: Response, next: NextFunction) {
		const tokenDecoded = AdminController.decodeToken(req?.headers.authorization);
		if (!tokenDecoded) return res.status(404).redirect("/signin");
		const role = tokenDecoded?.role;
		if (role !== "Admin") return res.status(401).redirect("/signin");
		next();
	}

	public async signUp(req: Request, res: Response) {
		try {
			const { user, password } = req.body;
			if (!(user && password)) return res.status(400).json({ msg: "No valid input!" });
			const newAdmin = AdminConverter.jsonToAdmin(req);
			if (!InputValidator.validateUser(newAdmin)) return res.status(400).json({ msg: "No valid input!" });
			const resultado = await GestionDeAdmin.crearCuenta(new PersistenciaDeAdmin(), newAdmin);
			if (resultado.duplicado) return res.status(303).json({ msg: `${newAdmin.getUser()} already exists!` });
			if (!resultado.creado) return res.status(400).json({ msg: `${newAdmin.getUser()} was not saved!` });
			return res.status(201).json({ msg: `${newAdmin.getUser()} saved!` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async logIn(req: Request, res: Response) {
		try {
			const { user, password } = req.body;
			if (!(user && password)) return res.status(400).json({ msg: "No valid input!" });

			const admin = AdminConverter.jsonToAdmin(req);
			const resultado = await GestionDeAdmin.iniciarSesionConUserPassword(new PersistenciaDeAdmin(), admin);
			if (!resultado.getUser()) return res.status(404).json({ msg: "No valid input!" });

			const tokenCreated = AdminController.createToken(resultado);

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
				res.redirect("/");
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async getAdminWithToken(req: Request, res: Response) {
		try {
			const tokenDecoded = AdminController.decodeToken(req?.headers.authorization);
			if (!tokenDecoded) return res.status(400).json({ msg: "No valid input!" }).redirect("/signin");
			const user = tokenDecoded.user;
			const admin = new Admin(user, "", "", "", "");
			const resultado = await GestionDeAdmin.iniciarSesionConUser(new PersistenciaDeAdmin(), admin);
			if (!resultado.getUser())
				return res
					.status(404)
					.json({ msg: `${admin.getUser()} was not found!` })
					.redirect("/signin");

			return res.status(200).json(resultado);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async updateAdmin(req: Request, res: Response) {
		try {
			const adminToSearch = new Admin(req.params.user, "", "", "", "");
			const adminToUpdate = AdminConverter.jsonToAdmin(req);
			if (!InputValidator.validateUser(adminToUpdate)) return res.status(400).json({ msg: "No valid input!" });
			const resultado = await GestionDeAdmin.actualizarCuenta(new PersistenciaDeAdmin(), adminToUpdate);
			if (!resultado) return res.status(404).json({ msg: `${adminToSearch.getUser()} was not found!` });
			return res.status(200).json({ msg: `${adminToSearch.getUser()} updated!` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async deleteAdmin(req: Request, res: Response) {
		try {
			const adminToDelete = new Admin(req.params.user, "", "", "", "");
			const resultado = await GestionDeAdmin.eliminarCuenta(new PersistenciaDeAdmin(), adminToDelete);
			if (!resultado) return res.status(404).json({ msg: `${adminToDelete.getUser()} was not found!` });
			return res.status(200).json({ msg: `${adminToDelete.getUser()} deleted!` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async getAllTransactions(req: Request, res: Response) {
		try {
			const resultado = await GestionDeTransacciones.listarTodasLasTransacciones(new PersistenciaDeTransacciones());
			return res.status(200).json(resultado);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}
}
