import BillingInfo from "../../entities/BillingInfo";
import Card from "../../entities/Card";
import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";
import IPersistenciaCuenta from "./IPersistenciaCuenta";

export default interface IPersistenciaClient extends IPersistenciaCuenta {
	actualizarBillingInfo(client: Client, billingInfo: BillingInfo): Promise<boolean>;
	agregarCard(client: Client, card: Card): Promise<boolean>;
	eliminarCard(client: Client, card: Card): Promise<boolean>;
	agregarTransaction(client: Client, transaction: Transaction): Promise<boolean>;
}
