import Cart from "../../entities/Cart";

export default interface IPersistenciaCarrito {
	guardarCarrito(cart: Cart): Promise<boolean>;
	recuperarCarrito(): Promise<Cart | null>;
}
