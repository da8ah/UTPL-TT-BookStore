import Cart from "../entities/Cart";

export default interface IPago {
	procesarPago(cart: Cart): Promise<boolean>;
}
