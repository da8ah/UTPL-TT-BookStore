import StockBook from "../../entities/StockBook";
import IPersistenciaLibro from "../../ports/persistencia/IPersistenciaLibro";

export default class GestionDeLibros {
	public static crearLibro(iPersistenciaLibro: IPersistenciaLibro, stockBook: StockBook): StockBook {
		const bookFound = iPersistenciaLibro.buscarUnLibroPorISBN(stockBook.getIsbn());
		if (bookFound) return stockBook;
		return iPersistenciaLibro.guardarLibroNuevo(stockBook);
	}

	public static listarCatalogoDeLibrosEnStock(iPersistenciaLibro: IPersistenciaLibro): StockBook[] {
		return iPersistenciaLibro.obtenerLibrosEnStock();
	}

	// Two StockBooks required in case of ISBN update
	public static actualizarLibro(iPersistenciaLibro: IPersistenciaLibro, stockBook: StockBook, originalStockBookToChangeISBN?: StockBook): StockBook {
		if (originalStockBookToChangeISBN !== undefined) return iPersistenciaLibro.actualizarLibro(stockBook, originalStockBookToChangeISBN);
		return iPersistenciaLibro.actualizarLibro(stockBook);
	}

	public static eliminarLibro(iPersistenciaLibro: IPersistenciaLibro, stockBook: StockBook): StockBook {
		return iPersistenciaLibro.eliminarLibro(stockBook);
	}
}
