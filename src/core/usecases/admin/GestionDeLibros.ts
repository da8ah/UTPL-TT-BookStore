import StockBook from "../../entities/StockBook";
import IPersistenciaLibro from "../../ports/persistencia/IPersistenciaLibro";

export default class GestionDeLibros {
	public static async crearLibro(iPersistenciaLibro: IPersistenciaLibro, stockBook: StockBook): Promise<boolean> {
		if (await iPersistenciaLibro.buscarUnLibroPorISBN(stockBook.getIsbn())) return false;
		return iPersistenciaLibro.guardarLibroNuevo(stockBook);
	}

	public static listarCatalogoDeLibrosEnStock(iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook[]> {
		return iPersistenciaLibro.obtenerLibrosEnStock();
	}

	// Two StockBooks required in case of ISBN update
	public static actualizarLibro(iPersistenciaLibro: IPersistenciaLibro, stockBook: StockBook, originalStockBookToChangeISBN?: StockBook): Promise<boolean> {
		return originalStockBookToChangeISBN !== undefined ? iPersistenciaLibro.actualizarLibro(stockBook, originalStockBookToChangeISBN) : iPersistenciaLibro.actualizarLibro(stockBook);
	}

	public static eliminarLibro(iPersistenciaLibro: IPersistenciaLibro, stockBook: StockBook): Promise<boolean> {
		return iPersistenciaLibro.eliminarLibro(stockBook);
	}
}
