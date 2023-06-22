import { Request, Response } from "express";
import config from "../../config/config";
import Cart from "../../core/entities/Cart";
import GestionDelCarrito from "../../core/usecases/client/CarritoDelClient";
import PersistenciaDeLibros from "../../services/database/adapters/PersistenciaDeLibros";
import PagoStripe from "../../services/payment/adapters/PagoStripe";
import { BookConverter } from "../../utils/json.casts";

export default class PaymentController {
	public getPaymentKey(req: Request, res: Response) {
		try {
			return res
				.status(200)
				.cookie("spk", config.stripePubKey, {
					expires: new Date(Date.now() + 300),
					httpOnly: true,
				})
				.end();
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async processPayment(req: Request, res: Response) {
		try {
			const books = BookConverter.jsonToBuyBooks(req);
			if (books.length <= 0) return res.status(400).json({ msg: "Requested no books to buy!" });

			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			const resultado: any = await GestionDelCarrito.pagarCarritoEnCaja(new PersistenciaDeLibros(), new PagoStripe(), new Cart(books));
			if (resultado === undefined || resultado.payment === undefined) return res.status(500).json({ msg: "Payment service unavailable!" });

			// Send PaymentIntent client_secret to client.
			return res
				.status(200)
				.cookie("sbk", resultado.payment, {
					expires: new Date(Date.now() + 300),
					httpOnly: true,
				})
				.json(resultado.boughtBooks);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}
}
