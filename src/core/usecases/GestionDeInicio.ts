import Client from "../entities/Client";
import StockBook from "../entities/StockBook";
import IPersistenciaClient from "../ports/persistencia/IPersistenciaClient";
import IPersistenciaLibro from "../ports/persistencia/IPersistenciaLibro";

export default class GestionDeInicio {
	public static listarCatalogoDeLibrosVisibles(iPersistenciaLibro: IPersistenciaLibro): Promise<StockBook[]> {
		return iPersistenciaLibro.obtenerLibrosVisibles();
	}

	public static async crearCuenta(iPersistenciaClient: IPersistenciaClient, client: Client): Promise<{ duplicado: boolean; creado: boolean }> {
		if (await iPersistenciaClient.comprobarCuentaDuplicada(new Client(client.getUser(), "", "", "", ""))) return { duplicado: true, creado: false };
		return (await iPersistenciaClient.guardarCuentaNueva(client)) ? { duplicado: false, creado: true } : { duplicado: false, creado: false };
	}

	public static async iniciarSesionConUserPassword(iPersistenciaClient: IPersistenciaClient, client: Client): Promise<Client | null> {
		if (await iPersistenciaClient.comprobarUserPassword(new Client(client.getUser(), "", "", "", client.getPassword()))) {
			const clientFound = (await iPersistenciaClient.obtenerCuenta(new Client(client.getUser(), "", "", "", ""))) as Client;
			if (clientFound) {
				clientFound.setPassword("");
				return clientFound;
			}
		}
		return null;
	}

	public static async iniciarSesionConUser(iPersistenciaClient: IPersistenciaClient, client: Client): Promise<Client | null> {
		const clientFound = (await iPersistenciaClient.obtenerCuenta(new Client(client.getUser(), "", "", "", ""))) as Client;
		if (clientFound) {
			clientFound.setPassword("");
			return clientFound;
		}
		return null;
	}
}
