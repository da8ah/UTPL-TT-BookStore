import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import BooksController from "../controllers/books.controller";

const homeRouter = Router();
const homeController = new AuthController();

// AUTH
homeRouter.post("/signup", homeController.signUp);
homeRouter.post("/signin", homeController.logIn);
// homeRouter.get("/logout", homeController.logOut); // With Session=true only

const booksController = new BooksController();
export const API_PATH = "/api/books";

// BOOKS
homeRouter.get(API_PATH, booksController.getAll);

export default homeRouter;
