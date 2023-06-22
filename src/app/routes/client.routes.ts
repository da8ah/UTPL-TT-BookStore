import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller";
import ClientController from "../controllers/client.controller";
import PaymentController from "../controllers/payment.controller";
import TransactionsController from "../controllers/transactions.controller";

const clientRouter = Router();
const homeController = new AuthController();
const clientController = new ClientController();
const paymentController = new PaymentController();
const transactionsController = new TransactionsController();
const passportAuth = passport.authenticate("client", {
	session: false,
});

export const API_PATH = "/api/clients";

// Ingreso con Token
clientRouter.get(`${API_PATH}/signin`, passportAuth, homeController.getClientWithToken);
// Actualizar Client
clientRouter.put(`${API_PATH}/:user`, clientController.authorizationVerification, passportAuth, clientController.updateClient);
// Actualizar BillingInfo
clientRouter.put(`${API_PATH}/:user/billing`, clientController.authorizationVerification, passportAuth, clientController.updateBillingInfo);
// Agregar Card
clientRouter.put(`${API_PATH}/:user/cards`, clientController.authorizationVerification, passportAuth, clientController.addCard);
// Eliminar Card
clientRouter.delete(`${API_PATH}/:user/cards`, clientController.authorizationVerification, passportAuth, clientController.rmCard);
// Eliminar Client
clientRouter.delete(`${API_PATH}/:user`, clientController.authorizationVerification, passportAuth, clientController.deleteClient);
// Solicitar Payment Credentials
clientRouter.get(`${API_PATH}/:user/payments`, clientController.authorizationVerification, passportAuth, paymentController.getPaymentKey);
// Registrar Payment
clientRouter.post(`${API_PATH}/:user/payments`, clientController.authorizationVerification, passportAuth, paymentController.processPayment);
// Registrar Transaction
clientRouter.post(`${API_PATH}/:user/transactions`, clientController.authorizationVerification, passportAuth, transactionsController.createCardTransaction);
// Traer todas las Transaction de un Client
clientRouter.get(`${API_PATH}/:user/transactions`, clientController.authorizationVerification, passportAuth, transactionsController.retrieveTransacions);

export default clientRouter;
