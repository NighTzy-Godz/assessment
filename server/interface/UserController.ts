import { NextFunction, Request, Response } from "express";
import UserUseCases from "../application/UserUseCases";
import IUser from "../domain/IUser";
import { UserAlreadyExistsError } from "../domain/UserAlreadyExistsError";
import { UserNotFoundError } from "../domain/UserNotFoundError";

class UserController {
  constructor(private userUseCases: UserUseCases) {}

  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.user?.email;

      if (!email) {
        res.status(400).send("Email is required in this request");
        return;
      }
      const user = await this.userUseCases.fetchUserData(email);

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        res.status(400).json("Profile image is required");
        return;
      }

      const { first_name, last_name, middle_name, phone_number, email }: IUser =
        req.body;

      const transformedData: IUser = {
        first_name,
        last_name,
        middle_name,
        profile_image: req.file.path as string,
        phone_number,
        email,
      };
      const newUser = await this.userUseCases.createUser(transformedData);
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        res.status(409).json("User already exists with this email");
      }
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const token = await this.userUseCases.loginUser(email);

      res.status(200).json(token);
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        res.status(404).json("User did not found");
      }

      next(err);
    }
  }
}

export default UserController;
