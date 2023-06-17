import Client from "../entities/Client";
import StockBook from "../entities/StockBook";
import IPersistenciaClient from "../ports/persistencia/IPersistenciaClient";
import IPersistenciaLibro from "../ports/persistencia/IPersistenciaLibro";

export default class GestionDeInicio {
	public static listarCatalogoDeLibrosVisibles(iPersistenciaLibro: IPersistenciaLibro): StockBook[] {
		return iPersistenciaLibro.obtenerLibrosVisibles();
	}

	public static crearCuenta(iPersistenciaClient: IPersistenciaClient, client: Client): Client {
		const clientFound = iPersistenciaClient.obtenerCuenta(new Client(client.getUser(), "", "", "", "")) as Client;
		if (clientFound) return client;
		const clientSaved = iPersistenciaClient.guardarCuentaNueva(client) as Client;
		clientSaved.setPassword("");
		return clientSaved;
	}

	public static iniciarSesionConUserPassword(iPersistenciaClient: IPersistenciaClient, client: Client): Client {
		if (iPersistenciaClient.compararPassword(new Client(client.getUser(), "", "", "", client.getPassword()))) {
			const clientFound = iPersistenciaClient.obtenerCuenta(new Client(client.getUser(), "", "", "", "")) as Client;
			if (clientFound) {
				clientFound.setPassword("");
				return clientFound;
			}
		}
		return client;
	}

	public static iniciarSesionConUser(iPersistenciaClient: IPersistenciaClient, client: Client): Client {
		const clientFound = iPersistenciaClient.obtenerCuenta(new Client(client.getUser(), "", "", "", "")) as Client;
		if (clientFound) {
			clientFound.setPassword("");
			return clientFound;
		}
		return client;
	}
}
