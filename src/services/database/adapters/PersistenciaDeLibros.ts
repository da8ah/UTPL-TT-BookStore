import { BookConverter } from "../../../utils/json.casts";
import StockBook from "../../../core/entities/StockBook";
import IPersistenciaLibro from "../../../core/ports/persistencia/IPersistenciaLibro";
import { BookCaster } from "../../../utils/db.model.casts";
import StockBookModel, { IStockBookModel } from "../models/StockBookModel";

export default class PersistenciaDeLibros implements IPersistenciaLibro {
	public async buscarUnLibroPorISBN(isbn: String): Promise<StockBook | null> {
		try {
			const bookFound: IStockBookModel | null = (await StockBookModel.findOne({ isbn })) || null;
			return bookFound ? BookCaster.modelToBook(bookFound) : null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async guardarLibroNuevo(stockBook: StockBook): Promise<boolean> {
		try {
			const bookModel: IStockBookModel = BookCaster.bookToModel(stockBook);
			return !!(await bookModel.save());
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async obtenerLibrosEnStock(): Promise<StockBook[]> {
		try {
			const books: IStockBookModel[] | null = (await StockBookModel.find()) || null;
			return books ? books.map((bookModel) => BookCaster.modelToBook(bookModel)) : [];
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async obtenerLibrosVisibles(): Promise<StockBook[]> {
		try {
			const books: IStockBookModel[] | null = (await StockBookModel.find({ visible: { $eq: true } })) || null;
			return books ? books.map((bookModel) => BookCaster.modelToBook(bookModel)) : [];
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async actualizarLibro(stockBook: StockBook, originalStockBookToChangeISBN?: StockBook): Promise<boolean> {
		try {
			if (originalStockBookToChangeISBN !== undefined)
				return !!(await StockBookModel.findOneAndUpdate({ isbn: originalStockBookToChangeISBN.getIsbn() }, BookConverter.bookToJSON(stockBook), { new: true }));

			return !!(await StockBookModel.findOneAndUpdate({ isbn: stockBook.getIsbn() }, BookConverter.bookToJSON(stockBook), { new: true }));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async eliminarLibro(stockBook: StockBook): Promise<boolean> {
		try {
			return !!(await StockBookModel.findOneAndDelete({ isbn: stockBook.getIsbn() }));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
