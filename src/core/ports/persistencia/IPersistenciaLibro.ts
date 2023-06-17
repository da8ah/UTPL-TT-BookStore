import StockBook from "../../entities/StockBook";

export default interface IPersistenciaLibro {
	buscarUnLibroPorISBN(isbn: string): StockBook | null;
	filtrarLibros(searchString: String): StockBook[];
	guardarLibroNuevo(stockBook: StockBook): StockBook;
	obtenerLibrosEnStock(): StockBook[];
	obtenerLibrosVisibles(): StockBook[];
	actualizarLibro(stockBook: StockBook, originalStockBookToChangeISBN?: StockBook): StockBook;
	eliminarLibro(stockBook: StockBook): StockBook;
}
