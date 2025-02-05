import { NextFunction, Request, Response, Router } from "express";
import UserController from "./UserController";
import UserUseCases from "../application/UserUseCases";
import UserRepository from "../infrastructure/repository/UserRepository";
import { storage } from "../cloudinary";
import multer from "multer";
import { TokenService } from "../infrastructure/services/TokenService";
import validateSchema from "../infrastructure/middleware/ValidateSchema";
import { registerUserSchema } from "../infrastructure/validators/UserValidator";
import isAuth from "../infrastructure/middleware/isAuth";

const app = Router();
const upload = multer({ storage });

const userRepository = new UserRepository();
const tokenService = new TokenService();
const userUserCases = new UserUseCases(userRepository, tokenService);
const userController = new UserController(userUserCases);

app.post(
  "/register-user",
  upload.single("profile_image"),
  [validateSchema(registerUserSchema)],
  (req: Request, res: Response, next: NextFunction) =>
    userController.registerUser(req, res, next)
);

app.post("/login-user", (req: Request, res: Response, next: NextFunction) => {
  userController.loginUser(req, res, next);
});

app.get(
  "/get-user-data",
  [isAuth],
  (req: Request, res: Response, next: NextFunction) =>
    userController.getUserData(req, res, next)
);

export default app;
