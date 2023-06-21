import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import Client from "../../../core/entities/Client";

export interface IBillingInfoModel extends Document {
	toWhom: string;
	ci: string;
	provincia: string;
	ciudad: string;
	numCasa: string;
	calles: string;
}

export interface ICardModel extends Document {
	ownerName: string;
	cardNumber: string;
	code: string;
	expiryDate: string;
	compareCardNumber: (cardNumber: string) => Promise<boolean>;
	compareCode: (code: string) => Promise<boolean>;
}

export interface IClientModel extends Document {
	user: string;
	name: string;
	email: string;
	mobile: string;
	password: string;
	billingInfo: IBillingInfoModel;
	cards: ICardModel[];
	transactions: { id: string }[];
	comparePassword: (password: string) => Promise<boolean>;
}

const billingInfoSchema = new Schema({
	toWhom: {
		type: String,
		required: true,
		trim: true,
	},
	ci: {
		type: String,
		required: true,
		trim: true,
	},
	provincia: {
		type: String,
		required: true,
		trim: true,
	},
	ciudad: {
		type: String,
		required: true,
		trim: true,
	},
	numCasa: {
		type: String,
		required: true,
		trim: true,
	},
	calles: {
		type: String,
		required: true,
		trim: true,
	},
});

const cardSchema = new Schema({
	ownerName: {
		type: String,
		required: true,
		trim: true,
	},
	cardNumber: {
		type: String,
		required: true,
		trim: true,
	},
	code: {
		type: String,
		required: true,
		trim: true,
	},
	expiryDate: {
		type: String,
		required: true,
		trim: true,
	},
});

const clientSchema = new Schema(
	{
		user: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		mobile: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		billingInfo: {
			_id: false,
			type: billingInfoSchema,
		},
		cards: [
			{
				_id: false,
				types: cardSchema,
			},
		],
		transactions: [
			{
				_id: false,
				id: {
					type: String,
					required: true,
					trim: true,
				},
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

cardSchema.pre<ICardModel>("save", async function (next) {
	const card = this;
	console.log(card);

	if (!(card.isModified("cardNumber") || card.isModified("code"))) return next();

	const salt = await bcrypt.genSalt(10);
	const hashCardNumber = await bcrypt.hash(card.cardNumber, salt);
	const hashCode = await bcrypt.hash(card.code, salt);
	card.cardNumber = hashCardNumber;
	card.code = hashCode;
	next();
});

cardSchema.methods.compareCardNumber = async function (cardNumber: string): Promise<boolean> {
	return await bcrypt.compare(cardNumber, this.cardNumber);
};
cardSchema.methods.compareCode = async function (code: string): Promise<boolean> {
	return await bcrypt.compare(code, this.code);
};

clientSchema.pre<IClientModel>("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	next();
});

clientSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
};

export default model<IClientModel>("Client", clientSchema);
