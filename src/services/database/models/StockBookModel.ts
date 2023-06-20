import { Schema, model, Document } from "mongoose";

export interface IStockBookModel extends Document {
	isbn: string;
	imgRef: string;
	title: string;
	author: string;
	releaseDate: string;
	grossPricePerUnit: number;
	inOffer: boolean;
	discountPercentage: number;
	hasIva: boolean;
	ivaPercentage: number;
	createdDate: string;
	description: string;
	stock: number;
	visible: boolean;
	recommended: boolean;
	bestSeller: boolean;
	recent: boolean;
}

const stockBookSchema = new Schema(
	{
		isbn: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		imgRef: {
			type: String,
			required: true,
			trim: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: String,
			required: true,
			trim: true,
		},
		releaseDate: {
			type: String,
			required: true,
			trim: true,
		},
		grossPricePerUnit: {
			type: Number,
			required: true,
		},
		inOffer: {
			type: Boolean,
			required: true,
		},
		discountPercentage: {
			type: Number,
			required: true,
		},
		hasIva: {
			type: Boolean,
			required: true,
		},
		ivaPercentage: {
			type: Number,
			required: true,
		},
		createdDate: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		visible: {
			type: Boolean,
			required: true,
		},
		recommended: {
			type: Boolean,
			required: true,
		},
		bestSeller: {
			type: Boolean,
			required: true,
		},
		recent: {
			type: Boolean,
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

stockBookSchema.index({ isbn: "text", title: "text", author: "text", description: "text" });

export default model<IStockBookModel>("Book", stockBookSchema);
