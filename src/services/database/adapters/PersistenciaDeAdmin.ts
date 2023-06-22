import Admin from "../../../core/entities/Admin";
import IPersistenciaCuenta from "../../../core/ports/persistencia/IPersistenciaCuenta";
import AdminModel, { IAdminModel } from "../models/AdminModel";
import { AdminCaster } from "../../../utils/db.model.casts";

export default class PersistenciaDeAdmin implements IPersistenciaCuenta {
	public async comprobarCuentaDuplicada(admin: Admin): Promise<boolean> {
		return !!(await AdminModel.exists({ user: admin.getUser().toLowerCase() }));
	}

	public async guardarCuentaNueva(admin: Admin): Promise<boolean> {
		try {
			const adminModel: IAdminModel = AdminCaster.adminToModel(admin);
			return !!(await adminModel.save());
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async comprobarUserPassword(admin: Admin): Promise<boolean> {
		const adminFound: IAdminModel | null = (await AdminModel.findOne({ user: admin.getUser().toLowerCase() })) || null;
		return adminFound ? adminFound.comparePassword(admin.getPassword()) : false;
	}

	public async obtenerCuenta(admin: Admin): Promise<Admin | null> {
		try {
			const adminFound: IAdminModel | null = (await AdminModel.findOne({ user: admin.getUser().toLowerCase() })) || null;
			return adminFound ? AdminCaster.modelToAdmin(adminFound) : null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async actualizarCuenta(admin: Admin, originalAdminToChangeUsername?: Admin): Promise<boolean> {
		try {
			if (originalAdminToChangeUsername !== undefined)
				return !!(await AdminModel.findOneAndUpdate({ user: originalAdminToChangeUsername.getUser().toLowerCase() }, AdminCaster.adminToModel(admin), {
					new: true,
				}));

			return !!(await AdminModel.findOneAndUpdate({ user: admin.getUser().toLowerCase() }, AdminCaster.adminToModel(admin), {
				new: true,
			}));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async eliminarCuenta(admin: Admin): Promise<boolean> {
		try {
			return !!(await AdminModel.findOneAndDelete({ user: admin.getUser().toLowerCase() }));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
