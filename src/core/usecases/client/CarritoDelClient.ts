import Cart from "../../entities/Cart";
import ToBuyBook from "../../entities/ToBuyBook";
import IPago from "../../ports/IPago";
import IPersistenciaCarrito from "../../ports/persistencia/IPersistenciaCarrito";
import IPersistenciaLibro from "../../ports/persistencia/IPersistenciaLibro";
import GestionDeLibros from "../admin/GestionDeLibros";

export default class GestionDelCarrito {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static async pagarCarritoEnCaja(iPersistenciaLibro: IPersistenciaLibro, iPago: IPago, cart: Cart): Promise<any> {
		// 1. RESTAR LIBROS DEL STOCK DISPONIBLE
		const boughtBooks: ToBuyBook[] = [];
		for (const toBuyBook of cart.getToBuyBooks()) {
			const stockBook = await iPersistenciaLibro.buscarUnLibroPorISBN(toBuyBook.getIsbn());
			if (stockBook) {
				// CONTINUAR SI ALGÚN LIBRO NO SE ACTUALIZA
				try {
					if (stockBook.getStock() >= toBuyBook.getCant() && toBuyBook.getCant() > 0) {
						stockBook.setStock(stockBook.getStock() - toBuyBook.getCant());
						// Posible Error
						if (await GestionDeLibros.actualizarLibro(iPersistenciaLibro, stockBook)) boughtBooks.push(toBuyBook);
					} else if (stockBook.getStock() < toBuyBook.getCant() && stockBook.getStock() > 0 && toBuyBook.getCant() > 0) {
						toBuyBook.setCant(stockBook.getStock());
						stockBook.setStock(0);
						// Posible Error
						if (await GestionDeLibros.actualizarLibro(iPersistenciaLibro, stockBook)) boughtBooks.push(toBuyBook);
					}
				} catch (error) {
					console.error(error);
				}
			}
		}
		if (boughtBooks.length === 0) return []; // if (boughtBooks = empty) return []

		// 2. RECALCULAR CON LIBROS COMPRADOS
		cart.setToBuyBooks(boughtBooks);

		// 3. PROCESAR PAGO
		return { payment: await iPago.procesarPago(cart.getTotalPrice()), boughtBooks };
	}

	public static guardarCarrito(iPersistenciaCarrito: IPersistenciaCarrito, cart: Cart): Promise<boolean> {
		return iPersistenciaCarrito.guardarCarrito(cart);
	}

	public static recuperarCarrito(iPersistenciaCarrito: IPersistenciaCarrito): Promise<Cart | null> {
		return iPersistenciaCarrito.recuperarCarrito();
	}

	public static async agregarLibroAlCarrito(cart: Cart, toBuyBook: ToBuyBook): Promise<boolean> {
		cart.addToBuyBook(toBuyBook);
		return cart.getToBuyBooks().includes(toBuyBook);
	}
	public static async quitarLibroDelCarrito(cart: Cart, toBuyBook: ToBuyBook): Promise<boolean> {
		cart.rmToBuyBook(toBuyBook);
		return !cart.getToBuyBooks().includes(toBuyBook);
	}
}
