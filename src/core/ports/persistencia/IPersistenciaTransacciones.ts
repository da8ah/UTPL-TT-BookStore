import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";

export default interface IPersistenciaTransacciones {
	guardarTransaccionDeClient(transaction: Transaction): Transaction;
	obtenerTransaccionesDeClient(client: Client): Transaction[];
	obtenerTodasLasTransacciones(): Transaction[];
}
