import User from "../../entities/User";

export default interface IPersistenciaCuenta {
	guardarCuentaNueva(user: User): User;
	obtenerCuenta(user: User): User | null;
	actualizarCuenta(user: User, originalUserToChangeUsername?: User): User;
	eliminarCuenta(user: User): User;
	compararPassword(user: User): boolean;
}
