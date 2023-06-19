import StockBook from "../../entities/StockBook";

export default interface IPersistenciaLibro {
	buscarUnLibroPorISBN(isbn: string): Promise<StockBook | null>;
	guardarLibroNuevo(stockBook: StockBook): Promise<boolean>;
	obtenerLibrosEnStock(): Promise<StockBook[]>;
	obtenerLibrosVisibles(): Promise<StockBook[]>;
	actualizarLibro(stockBook: StockBook, originalStockBookToChangeISBN?: StockBook): Promise<boolean>;
	eliminarLibro(stockBook: StockBook): Promise<boolean>;
}
