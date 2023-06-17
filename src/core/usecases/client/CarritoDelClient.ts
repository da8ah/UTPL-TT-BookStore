import Cart from "../../entities/Cart";
import ToBuyBook from "../../entities/ToBuyBook";
import IPersistenciaCarrito from "../../ports/persistencia/IPersistenciaCarrito";

export default class GestionDelCarrito {
	public static guardarCarrito(iPersistenciaCarrito: IPersistenciaCarrito, cart: Cart): boolean {
		return iPersistenciaCarrito.guardarCarrito(cart);
	}

	public static recuperarCarrito(iPersistenciaCarrito: IPersistenciaCarrito): Cart | null {
		return iPersistenciaCarrito.recuperarCarrito();
	}

	public static agregarLibroAlCarrito(cart: Cart, toBuyBook: ToBuyBook): boolean {
		cart.addToBuyBook(toBuyBook);
		return cart.getToBuyBooks().includes(toBuyBook);
	}
	public static quitarLibroDelCarrito(cart: Cart, toBuyBook: ToBuyBook): boolean {
		cart.rmToBuyBook(toBuyBook);
		return !cart.getToBuyBooks().includes(toBuyBook);
	}
}
