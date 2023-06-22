import Stripe from "stripe";
import config from "../../../config/config";
import IPago from "../../../core/ports/IPago";

const stripe = require("stripe")(config.stripeSecKey);

export default class PagoStripe implements IPago {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public async procesarPago(amount: number): Promise<any> {
		try {
			if (amount < 0) return null;

			// Create a PaymentIntent with the order amount and currency.
			const params: Stripe.PaymentIntentCreateParams = {
				amount: Number.parseInt(amount.toFixed(2).replace(".", "")),
				currency: "usd",
				payment_method_types: ["card"],
			};

			const paymentIntent = await stripe.paymentIntents.create(params);
			return paymentIntent ? paymentIntent.client_secret : null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
