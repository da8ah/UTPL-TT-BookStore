import User from "../../entities/User";

export default interface IPersistenciaCuenta {
	comprobarCuentaDuplicada(user: User): Promise<boolean>;
	guardarCuentaNueva(user: User): Promise<boolean>;
	comprobarUserPassword(user: User): Promise<boolean>;
	obtenerCuenta(user: User): Promise<User | null>;
	actualizarCuenta(user: User, originalUserToChangeUsername?: User): Promise<boolean>;
	eliminarCuenta(user: User): Promise<boolean>;
}
