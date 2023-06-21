import BillingInfo from "../../core/entities/BillingInfo";
import StockBook from "../../core/entities/StockBook";
import User from "../../core/entities/User";

export const patterns = {
	StockBook: {
		ISBN: /^(\d{13}|\d{10})$/,
		IMG_REF: /^(https:\/\/)[\w+\.]+(png|jpg)$/,
		TITLE: /\w{1,10}/,
		AUTHOR: /\w{1,10}/,
		RELEASE_DATE: /\d{1,2}\/\d{1,2}\/\d{4}/,
		CREATED_DATE: /(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/,
		DESCRIPTION: /\w{1,100}/,
		GROSS_PRICE_PER_UNIT: /\d{1,3}\.\d{2}/,
		DISCOUNT_PERCENTAGE: /\d{1,3}/,
		STOCK: /\d{1,4}/,
	},
	User: {
		USER: /^[A-Za-z]((\_|\.)?[A-Za-z0-9]){5,19}$/,
		NAME: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){1,4}$/,
		EMAIL: /^([\w\.\-]+){1,3}@([\w\-]+)((\.(\w){2,3})+)$/,
		MOBILE: /^(\+593)?\s?(\d{10}|\d{9})$/,
		PASSWORD: /^[\w\W\s]{5,}$/,
	},
	BillingInfo: {
		TO_WHOM: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){1,4}$/,
		CI: /^\d{10}$/,
		PROVINCIA: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\.)?(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){0,4}$/,
		CIUDAD: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}(\.)?(\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}){0,4}$/,
		NUM_CASA: /^\d((\-|\s)?\d){1,10}$/,
		CALLES: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]{1,15}((\.|\-|\,)?\s?[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]{1,15}){3,10}$/,
	},
};

export class InputValidator {
	public static validateStockBook(stockBook: StockBook): boolean {
		if (!new RegExp(patterns.StockBook.ISBN).test(stockBook.getIsbn())) return false;
		if (!new RegExp(patterns.StockBook.IMG_REF).test(stockBook.getImgRef())) return false;
		if (!new RegExp(patterns.StockBook.TITLE).test(stockBook.getTitle())) return false;
		if (!new RegExp(patterns.StockBook.AUTHOR).test(stockBook.getAuthor())) return false;
		if (!new RegExp(patterns.StockBook.RELEASE_DATE).test(stockBook.getReleaseDate())) return false;
		if (!new RegExp(patterns.StockBook.CREATED_DATE).test(stockBook.getCreatedDate())) return false;
		if (!new RegExp(patterns.StockBook.DESCRIPTION).test(stockBook.getDescription())) return false;
		if (!new RegExp(patterns.StockBook.GROSS_PRICE_PER_UNIT).test(stockBook.getGrossPricePerUnit().toFixed(2))) return false;
		if (typeof stockBook.isInOffer() !== "boolean") return false;
		if (!new RegExp(patterns.StockBook.DISCOUNT_PERCENTAGE).test(stockBook.getDiscountPercentage().toString())) return false;
		if (typeof stockBook.itHasIva() !== "boolean") return false;
		if (!new RegExp(patterns.StockBook.STOCK).test(stockBook.getStock()?.toString())) return false;
		if (typeof stockBook.isVisible() !== "boolean") return false;
		if (typeof stockBook.isRecommended() !== "boolean") return false;
		if (typeof stockBook.isBestSeller() !== "boolean") return false;
		if (typeof stockBook.isRecent() !== "boolean") return false;
		return true;
	}

	public static validateUser(user: User): boolean {
		if (!new RegExp(patterns.User.USER).test(user.getUser())) return false;
		if (!new RegExp(patterns.User.NAME).test(user.getName())) return false;
		if (!new RegExp(patterns.User.EMAIL).test(user.getEmail())) return false;
		if (!new RegExp(patterns.User.MOBILE).test(user.getMobile())) return false;
		if (!new RegExp(patterns.User.PASSWORD).test(user.getPassword())) return false;
		return true;
	}
	public static validateBillingInfo(billingInfo: BillingInfo): boolean {
		if (!new RegExp(patterns.BillingInfo.TO_WHOM).test(billingInfo.getToWhom())) return false;
		if (!new RegExp(patterns.BillingInfo.CI).test(billingInfo.getCi())) return false;
		if (!new RegExp(patterns.BillingInfo.PROVINCIA).test(billingInfo.getProvincia())) return false;
		if (!new RegExp(patterns.BillingInfo.CIUDAD).test(billingInfo.getCiudad())) return false;
		if (!new RegExp(patterns.BillingInfo.NUM_CASA).test(billingInfo.getNumCasa())) return false;
		if (!new RegExp(patterns.BillingInfo.CALLES).test(billingInfo.getCalles())) return false;
		return true;
	}
}
