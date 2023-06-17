import BillingInfo from "../../entities/BillingInfo";
import Card from "../../entities/Card";
import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";
import IPersistenciaCuenta from "./IPersistenciaCuenta";

export default interface IPersistenciaClient extends IPersistenciaCuenta {
	actualizarBillingInfo(client: Client, billingInfo: BillingInfo): boolean;
	agregarCard(client: Client, card: Card): boolean;
	eliminarCard(client: Client, card: Card): boolean;
	agregarTransaction(client: Client, transaction: Transaction): boolean;
}
