import { Request, Response } from "express";
import Stripe from "stripe";
import config from "../../config/config";

const stripe = require("stripe")(config.stripeSecKey);

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

	public async makePayment(req: Request, res: Response) {
		try {
			const { amount, paymentMethodType }: { amount: number; paymentMethodType: string } = req.body;

			// Create a PaymentIntent with the order amount and currency.
			const params: Stripe.PaymentIntentCreateParams = {
				amount,
				currency: "usd",
				payment_method_types: [paymentMethodType],
			};

			const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params);

			// Send publishable key and PaymentIntent client_secret to client.
			res.status(200).json({ clientSecret: paymentIntent.client_secret });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}
}
