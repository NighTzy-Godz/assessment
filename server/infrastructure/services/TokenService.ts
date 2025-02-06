import jwt from "jsonwebtoken";
import IUser from "../../domain/IUser";
import { JWT_SECRET_PASS } from "../../config/env";
import ITokenService from "../../domain/ITokenService";

export class TokenService implements ITokenService {
  generateToken(user: IUser): string {
    const payload = {
      email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET_PASS as string, {
      expiresIn: "2d",
    });
  }
}
