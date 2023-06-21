import { ClientConverter } from "../../../app/tools/casts";
import BillingInfo from "../../../core/entities/BillingInfo";
import Card from "../../../core/entities/Card";
import Client from "../../../core/entities/Client";
import Transaction from "../../../core/entities/Transaction";
import IPersistenciaClient from "../../../core/ports/persistencia/IPersistenciaClient";
import { ClientCaster } from "../models/ClassCaster";
import ClientModel, { IClientModel } from "../models/ClientModel";

export default class PersistenciaDeClient implements IPersistenciaClient {
	public async comprobarCuentaDuplicada(client: Client): Promise<boolean> {
		return !!(await ClientModel.exists({ user: client.getUser().toLowerCase() }));
	}

	public async guardarCuentaNueva(client: Client): Promise<boolean> {
		try {
			const clientModel: IClientModel = ClientCaster.clientToModel(client);
			return !!(await clientModel.save());
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async comprobarUserPassword(client: Client): Promise<boolean> {
		const clientFound: IClientModel | null = (await ClientModel.findOne({ user: client.getUser().toLowerCase() })) || null;
		return clientFound ? clientFound.comparePassword(client.getPassword()) : false;
	}

	public async obtenerCuenta(client: Client): Promise<Client | null> {
		try {
			const clientFound: IClientModel | null = (await ClientModel.findOne({ user: client.getUser().toLowerCase() })) || null;
			return clientFound ? ClientCaster.modelToClient(clientFound) : null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async actualizarCuenta(client: Client, originalClientToChangeUsername?: Client): Promise<boolean> {
		try {
			if (originalClientToChangeUsername !== undefined)
				return !!(await ClientModel.findOneAndUpdate({ user: originalClientToChangeUsername.getUser().toLowerCase() }, ClientConverter.clientToJSON(client), {
					new: true,
				}));

			return !!(await ClientModel.findOneAndUpdate({ user: client.getUser().toLowerCase() }, ClientConverter.clientToJSON(client), {
				new: true,
			}));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async actualizarBillingInfo(client: Client, billingInfo: BillingInfo): Promise<boolean> {
		try {
			return !!(await ClientModel.findOneAndUpdate(
				{ user: client.getUser().toLowerCase() },
				{ $set: { billingInfo } },
				{
					new: true,
				},
			));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async agregarCard(client: Client, card: Card): Promise<boolean> {
		try {
			return !!(await ClientModel.findOneAndUpdate(
				{ user: client.getUser().toLowerCase() },
				{ $addToSet: { cards: card } },
				{
					new: true,
				},
			));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async eliminarCard(client: Client, card: Card): Promise<boolean> {
		try {
			return !!(await ClientModel.findOneAndUpdate(
				{ user: client.getUser().toLowerCase() },
				{ $pull: { cards: { cardNumber: card.getCardNumber() } } },
				{
					new: true,
				},
			));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async agregarTransaction(client: Client, transaction: Transaction): Promise<boolean> {
		try {
			return !!(await ClientModel.findOneAndUpdate(
				{ user: client.getUser().toLowerCase() },
				{ $push: { transactions: { id: transaction.getId() } } },
				{
					new: true,
				},
			));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async eliminarCuenta(client: Client): Promise<boolean> {
		try {
			return !!(await ClientModel.findOneAndDelete({ user: client.getUser().toLowerCase() }));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
