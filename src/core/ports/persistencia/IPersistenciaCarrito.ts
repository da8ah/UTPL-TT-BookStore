import Cart from "../../entities/Cart";

export default interface IPersistenciaCarrito {
	guardarCarrito(cart: Cart): boolean;
	recuperarCarrito(): Cart | null;
}
