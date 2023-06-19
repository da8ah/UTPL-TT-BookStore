import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";

export default interface IPersistenciaTransacciones {
	guardarTransaccionDeClient(transaction: Transaction): Promise<boolean>;
	obtenerTransaccionesDeClient(client: Client): Promise<Transaction[]>;
	obtenerTodasLasTransacciones(): Promise<Transaction[]>;
}
