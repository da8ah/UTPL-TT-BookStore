import { Router } from "express";
import passport from "passport";
import AdminController from "../controllers/admin.controller";
import BooksController from "../controllers/books.controller";

const adminRouter = Router();
const adminController = new AdminController();
const passportAuth = passport.authenticate("admin", {
	session: false,
	failureRedirect: "/signin",
});

export const API_PATH = "/api/admin";

// AUTH
adminRouter.post(`${API_PATH}/login`, adminController.logIn);
// adminRouter.get(`${API_PATH}/logout`, adminController.logOut); // With Session=true only
adminRouter.post(`${API_PATH}/newuser`, passportAuth, adminController.signUp);

// ADMIN
adminRouter.get(`${API_PATH}/login`, adminController.roleVerification, passportAuth, adminController.getAdminWithToken);
adminRouter.put(`${API_PATH}/:user`, adminController.roleVerification, passportAuth, adminController.updateAdmin);
adminRouter.delete(`${API_PATH}/:user`, adminController.roleVerification, passportAuth, adminController.deleteAdmin);

const booksController = new BooksController();

// BOOKS
// Listar todo Book en Stock
adminRouter.get(`${API_PATH}/books`, adminController.roleVerification, passportAuth, booksController.getAllStock);
// Crear nuevo Book
adminRouter.post(`${API_PATH}/books`, adminController.roleVerification, passportAuth, booksController.createBook);
// Actualizar Book
adminRouter.put(`${API_PATH}/books/:isbn`, adminController.roleVerification, passportAuth, booksController.updateBook);
// Eliminar Book
adminRouter.delete(`${API_PATH}/books/:isbn`, adminController.roleVerification, passportAuth, booksController.deleteBook);

// TRANSACTIONS
const transactionsController = adminController;

adminRouter.get(`${API_PATH}/transactions`, adminController.roleVerification, passportAuth, transactionsController.getAllTransactions);

export default adminRouter;
