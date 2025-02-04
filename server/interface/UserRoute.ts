import { NextFunction, Request, Response, Router } from "express";
import UserController from "./UserController";
import UserUseCases from "../application/UserUseCases";
import UserRepository from "../infrastructure/UserRepository";
import { storage } from "../cloudinary";
import multer from "multer";
import { TokenService } from "../infrastructure/TokenService";

const app = Router();
const upload = multer({ storage });

const userRepository = new UserRepository();
const tokenService = new TokenService();
const userUserCases = new UserUseCases(userRepository, tokenService);
const userController = new UserController(userUserCases);

app.post(
  "/register-user",
  upload.single("profile_image"),
  (req: Request, res: Response, next: NextFunction) =>
    userController.registerUser(req, res, next)
);

app.post("/login-user", (req: Request, res: Response, next: NextFunction) => {
  userController.loginUser(req, res, next);
});

export default app;
