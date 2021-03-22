import express from "express";
import { join, login, logout } from "../controllers/userController.js";
import { home, search } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/logout", logout);
globalRouter.get("/search", search);

export default globalRouter;