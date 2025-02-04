import { NextFunction, Request, Response } from "express";
import UserUseCases from "../application/UserUseCases";
import IUser from "../domain/IUser";
import { UserAlreadyExistsError } from "../domain/UserAlreadyExistsError";

class UserController {
  constructor(private userUseCases: UserUseCases) {}

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
      console.log("ERror - ", error);
      if (error instanceof UserAlreadyExistsError) {
        res.status(400).json("User already exists with this email");
      }
      next(error);
    }
  }
}

export default UserController;
