import jwt from "jsonwebtoken";
import IUser from "../domain/IUser";
import { JWT_SECRET_PASS } from "../config/env";

export class TokenService {
  generateToken(user: IUser): string {
    const payload = {
      first_name: user.first_name,
      email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET_PASS as string, {
      expiresIn: "2d",
    });
  }
}
