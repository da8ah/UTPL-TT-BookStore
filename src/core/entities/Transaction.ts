import Cart from "./Cart";

export default abstract class Transaction {
	private id: string;
	private user: string;
	private name: string;
	private email: string;
	private mobile: string;
	private date: string;
	private payment: number;
	private cart?: Cart;

	constructor(id: string, user: string, name: string, email: string, mobile: string, date: string, payment: number, cart?: Cart) {
		this.id = id;
		this.user = user;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.date = date;
		this.payment = payment;
		this.cart = cart;
	}

	public getId(): string {
		return this.id;
	}
	public setId(id: string) {
		this.id = id;
	}

	public getUser(): string {
		return this.user;
	}
	public setUser(user: string) {
		this.user = user;
	}

	public getName(): string {
		return this.name;
	}
	public setName(name: string) {
		this.name = name;
	}

	public getEmail(): string {
		return this.email;
	}
	public setEmail(email: string) {
		this.email = email;
	}

	public getMobile(): string {
		return this.mobile;
	}
	public setMobile(mobile: string) {
		this.mobile = mobile;
	}

	public getDate(): string {
		return this.date;
	}
	public setDate(date: string) {
		this.date = date;
	}

	public getPayment(): number {
		return this.payment;
	}
	public setPayment(payment: number) {
		this.payment = payment;
	}

	public getCart(): Cart | undefined {
		return this.cart;
	}
	public setCart(cart: Cart) {
		this.cart = cart;
	}
}
