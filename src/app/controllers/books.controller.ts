import { Request, Response } from "express";
import StockBook from "../../core/entities/StockBook";
import GestionDeLibros from "../../core/usecases/admin/GestionDeLibros";
import GestionDeInicio from "../../core/usecases/GestionDeInicio";
import PersistenciaDeLibros from "../../services/database/adapters/PersistenciaDeLibros";
import { BookConverter } from "../tools/casts";
import { InputValidator, patterns } from "../tools/validations";

export default class BooksController {
	public async createBook(req: Request, res: Response) {
		try {
			const newStockBook = BookConverter.jsonToBook(req);
			if (!InputValidator.validateStockBook(newStockBook)) return res.status(400).json({ msg: "No valid input!" });
			const resultado = await GestionDeLibros.crearLibro(new PersistenciaDeLibros(), newStockBook);
			if (resultado.duplicado) return res.status(303).json({ msg: `${newStockBook.getIsbn()} already exists!` });
			if (!resultado.creado) return res.status(400).json({ msg: `${newStockBook.getIsbn()} was not saved!` });
			return res.status(201).json({ msg: `${newStockBook.getIsbn()} saved!` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async getAll(req: Request, res: Response) {
		try {
			const resultado = await GestionDeInicio.listarCatalogoDeLibrosVisibles(new PersistenciaDeLibros());
			return res.status(200).json(resultado);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async getAllStock(req: Request, res: Response) {
		try {
			const resultado = await GestionDeLibros.listarCatalogoDeLibrosEnStock(new PersistenciaDeLibros());
			return res.status(200).json(resultado);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async updateBook(req: Request, res: Response) {
		try {
			const stockBook = BookConverter.jsonToBook(req);
			if (!InputValidator.validateStockBook(stockBook)) return res.status(400).json({ msg: "No valid input!" });

			const stockBookToSearch = req.body.originalStockBookISBN;
			if (stockBookToSearch !== undefined && new RegExp(patterns.StockBook.ISBN).test(stockBookToSearch)) {
				const resultado = await GestionDeLibros.actualizarLibro(new PersistenciaDeLibros(), stockBook, new StockBook(stockBookToSearch, "", "", "", "", "", ""));
				if (!resultado) return res.status(400).json({ msg: `${stockBookToSearch.getIsbn()} was not updated!` });
				return res.status(200).json({ msg: `${stockBook.getIsbn()} updated!` });
			} else {
				const resultado = await GestionDeLibros.actualizarLibro(new PersistenciaDeLibros(), stockBook);
				if (!resultado) return res.status(400).json({ msg: `${stockBookToSearch.getIsbn()} was not updated!` });
				return res.status(200).json({ msg: `${stockBook.getIsbn()} updated!` });
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async deleteBook(req: Request, res: Response) {
		try {
			const isbn = req.params.isbn;
			if (isbn === undefined || !new RegExp(patterns.StockBook.ISBN).test(isbn)) return res.status(400).json({ msg: "No valid input!" });

			const stockBook = new StockBook(isbn, "", "", "", "", "", "");
			const resultado = await GestionDeLibros.eliminarLibro(new PersistenciaDeLibros(), stockBook);
			if (!resultado) return res.status(400).json({ msg: `${stockBook.getIsbn()} was not deleted!` });
			return res.status(200).json({ msg: `${stockBook.getIsbn()} deleted!` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}
}
