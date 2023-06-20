import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdminModel extends Document {
	user: string;
	name: string;
	email: string;
	mobile: string;
	password: string;
	comparePassword: (password: string) => Promise<boolean>;
}

const adminSchema = new Schema(
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
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

adminSchema.pre<IAdminModel>("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	next();
});

adminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
};

export default model<IAdminModel>("Admin", adminSchema);
