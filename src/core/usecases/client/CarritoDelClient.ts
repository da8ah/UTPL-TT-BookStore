import Cart from "../../entities/Cart";
import ToBuyBook from "../../entities/ToBuyBook";
import IPersistenciaCarrito from "../../ports/persistencia/IPersistenciaCarrito";

export default class GestionDelCarrito {
	public static guardarCarrito(iPersistenciaCarrito: IPersistenciaCarrito, cart: Cart): Promise<boolean> {
		return iPersistenciaCarrito.guardarCarrito(cart);
	}

	public static asyncrecuperarCarrito(iPersistenciaCarrito: IPersistenciaCarrito): Promise<Cart | null> {
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
