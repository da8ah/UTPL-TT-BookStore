import Transaction from "../../entities/Transaction";
import IPersistenciaTransacciones from "../../ports/persistencia/IPersistenciaTransacciones";

export default class GestionDeTransacciones {
	public static listarTodasLasTransacciones(iPersistenciaTransacciones: IPersistenciaTransacciones): Transaction[] {
		return iPersistenciaTransacciones.obtenerTodasLasTransacciones();
	}
}
