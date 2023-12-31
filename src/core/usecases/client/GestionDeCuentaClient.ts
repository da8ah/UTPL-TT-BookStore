import BillingInfo from "../../entities/BillingInfo";
import Card from "../../entities/Card";
import Client from "../../entities/Client";
import IPersistenciaClient from "../../ports/persistencia/IPersistenciaClient";

export default class GestionDeCuentaClient {
	public static async actualizarCuenta(iPersistenciaClient: IPersistenciaClient, client: Client, originalClientToChangeUsername?: Client): Promise<boolean> {
		if (!await iPersistenciaClient.comprobarUserPassword(new Client(client.getUser(), "", "", "", client.getPassword()))) return false
		return originalClientToChangeUsername !== undefined ? iPersistenciaClient.actualizarCuenta(client, originalClientToChangeUsername) : iPersistenciaClient.actualizarCuenta(client);
	}

	public static actualizarBillingInfo(iPersistenciaClient: IPersistenciaClient, client: Client, billingInfo: BillingInfo): Promise<boolean> {
		return iPersistenciaClient.actualizarBillingInfo(new Client(client.getUser(), "", "", "", ""), billingInfo);
	}
	public static agregarCard(iPersistenciaClient: IPersistenciaClient, client: Client, card: Card): Promise<boolean> {
		return iPersistenciaClient.agregarCard(client, card);
	}
	public static eliminarCard(iPersistenciaClient: IPersistenciaClient, client: Client, card: Card): Promise<boolean> {
		return iPersistenciaClient.eliminarCard(client, card);
	}

	public static eliminarCuenta(iPersistenciaClient: IPersistenciaClient, client: Client): Promise<boolean> {
		return iPersistenciaClient.eliminarCuenta(client);
	}
}
