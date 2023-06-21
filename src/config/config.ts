import { config } from "dotenv";

config();

export default {
	PORT: process.env.PORT || 5000,
	MONGO_URI: process.env.DBURI || "mongodb://localhost/bookstoredb",
	jwtSecret: process.env.JWT_SECRET,
	stripePubKey: process.env.STRIPE_PUB_KEY,
	stripeSecKey: process.env.STRIPE_SEC_KEY,
	stripeFrontend: process.env.STRIPE_FRONTEND || "https://js.stripe.com/v3/",
};
