import Admin from "../../entities/Admin";
import IPersistenciaCuenta from "../../ports/persistencia/IPersistenciaCuenta";

export default class GestionDeAdmin {
	public static async crearCuenta(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin): Promise<{ duplicado: boolean; creado: boolean }> {
		if (await iPersistenciaCuenta.comprobarCuentaDuplicada(new Admin(admin.getUser(), "", "", "", ""))) return { duplicado: true, creado: false };
		return (await iPersistenciaCuenta.guardarCuentaNueva(admin)) ? { duplicado: false, creado: true } : { duplicado: false, creado: false };
	}

	public static async iniciarSesionConUserPassword(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin): Promise<Admin> {
		if (await iPersistenciaCuenta.comprobarUserPassword(new Admin(admin.getUser(), "", "", "", admin.getPassword()))) {
			const adminFound = (await iPersistenciaCuenta.obtenerCuenta(new Admin(admin.getUser(), "", "", "", ""))) as Admin;
			if (adminFound) {
				adminFound.setPassword("");
				return adminFound;
			}
		}
		return new Admin("", "", "", "", "");
	}

	public static async iniciarSesionConUser(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin): Promise<Admin> {
		const adminFound = (await iPersistenciaCuenta.obtenerCuenta(new Admin(admin.getUser(), "", "", "", ""))) as Admin;
		if (adminFound) {
			adminFound.setPassword("");
			return adminFound;
		}
		return new Admin("", "", "", "", "");
	}

	public static actualizarCuenta(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin, originalAdminToChangeUsername?: Admin): Promise<boolean> {
		return originalAdminToChangeUsername !== undefined ? iPersistenciaCuenta.actualizarCuenta(admin, originalAdminToChangeUsername) : iPersistenciaCuenta.actualizarCuenta(admin);
	}

	public static eliminarCuenta(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin): Promise<boolean> {
		return iPersistenciaCuenta.eliminarCuenta(admin);
	}
}
