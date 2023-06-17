import Admin from "../../entities/Admin";
import IPersistenciaCuenta from "../../ports/persistencia/IPersistenciaCuenta";

export default class GestionDeAdmin {
	public static crearCuenta(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin): Admin {
		const adminFound = iPersistenciaCuenta.obtenerCuenta(new Admin(admin.getUser(), "", "", "", "")) as Admin;
		if (adminFound) return admin;
		const adminSaved = iPersistenciaCuenta.guardarCuentaNueva(admin) as Admin;
		adminSaved.setPassword("");
		return adminSaved;
	}

	public static iniciarSesionConUserPassword(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin): Admin {
		if (iPersistenciaCuenta.compararPassword(new Admin(admin.getUser(), "", "", "", admin.getPassword()))) {
			const adminFound = iPersistenciaCuenta.obtenerCuenta(new Admin(admin.getUser(), "", "", "", "")) as Admin;
			if (adminFound) {
				adminFound.setPassword("");
				return adminFound;
			}
		}
		return admin;
	}

	public static iniciarSesionConUser(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin): Admin {
		const adminFound = iPersistenciaCuenta.obtenerCuenta(new Admin(admin.getUser(), "", "", "", "")) as Admin;
		if (adminFound) {
			adminFound.setPassword("");
			return adminFound;
		}
		return admin;
	}

	public static actualizarCuenta(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin, originalAdminToChangeUsername?: Admin): Admin {
		let adminUpdated;
		if (originalAdminToChangeUsername !== undefined) adminUpdated = iPersistenciaCuenta.actualizarCuenta(admin, originalAdminToChangeUsername) as Admin;
		else adminUpdated = iPersistenciaCuenta.actualizarCuenta(admin) as Admin;
		adminUpdated.setPassword("");
		return adminUpdated;
	}

	public static eliminarCuenta(iPersistenciaCuenta: IPersistenciaCuenta, admin: Admin): Admin {
		const adminDeleted = iPersistenciaCuenta.eliminarCuenta(admin) as Admin;
		adminDeleted.setPassword("");
		return adminDeleted;
	}
}
