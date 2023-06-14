export default class User {
	private user: string;
	private name: string;
	private email: string;
	private mobile: string;
	private password: string;

	constructor(user: string, name: string, email: string, mobile: string, password: string) {
		this.user = user;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.password = password;
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

	public getPassword(): string {
		return this.password;
	}
	public setPassword(password: string) {
		this.password = password;
	}
}
