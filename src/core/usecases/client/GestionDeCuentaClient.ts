import BillingInfo from "../../entities/BillingInfo";
import Card from "../../entities/Card";
import Client from "../../entities/Client";
import IPersistenciaClient from "../../ports/persistencia/IPersistenciaClient";

export default class GestionDeCuentaClient {
	public static actualizarCuenta(iPersistenciaClient: IPersistenciaClient, client: Client, originalClientToChangeUsername?: Client): Client {
		let clientUpdated;
		if (originalClientToChangeUsername !== undefined) clientUpdated = iPersistenciaClient.actualizarCuenta(client, originalClientToChangeUsername) as Client;
		else clientUpdated = iPersistenciaClient.actualizarCuenta(client) as Client;
		clientUpdated.setPassword("");
		return clientUpdated;
	}

	public static actualizarBillingInfo(iPersistenciaClient: IPersistenciaClient, client: Client, billingInfo: BillingInfo): boolean {
		return iPersistenciaClient.actualizarBillingInfo(client, billingInfo);
	}
	public static agregarCard(iPersistenciaClient: IPersistenciaClient, client: Client, card: Card): boolean {
		return iPersistenciaClient.agregarCard(client, card);
	}
	public static eliminarCard(iPersistenciaClient: IPersistenciaClient, client: Client, card: Card): boolean {
		return iPersistenciaClient.eliminarCard(client, card);
	}

	public static eliminarCuenta(iPersistenciaClient: IPersistenciaClient, client: Client): Client {
		const clientDeleted = iPersistenciaClient.eliminarCuenta(client) as Client;
		clientDeleted.setPassword("");
		return clientDeleted;
	}
}
