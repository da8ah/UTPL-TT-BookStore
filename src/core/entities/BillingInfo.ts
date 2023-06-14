export default class BillingInfo {
	private toWhom: string;
	private ci: string;
	private provincia: string;
	private ciudad: string;
	private numCasa: string;
	private calles: string;

	constructor(toWhom: string, ci: string, provincia: string, ciudad: string, numCasa: string, calles: string) {
		this.toWhom = toWhom;
		this.ci = ci;
		this.provincia = provincia;
		this.ciudad = ciudad;
		this.numCasa = numCasa;
		this.calles = calles;
	}

	public getToWhom(): string {
		return this.toWhom;
	}

	public setToWhom(toWhom: string) {
		this.toWhom = toWhom;
	}

	public getCi(): string {
		return this.ci;
	}

	public setCi(ci: string) {
		this.ci = ci;
	}

	public getProvincia(): string {
		return this.provincia;
	}

	public setProvincia(provincia: string) {
		this.provincia = provincia;
	}

	public getCiudad(): string {
		return this.ciudad;
	}

	public setCiudad(ciudad: string) {
		this.ciudad = ciudad;
	}

	public getNumCasa(): string {
		return this.numCasa;
	}

	public setNumCasa(numCasa: string) {
		this.numCasa = numCasa;
	}

	public getCalles(): string {
		return this.calles;
	}

	public setCalles(calles: string) {
		this.calles = calles;
	}
}
