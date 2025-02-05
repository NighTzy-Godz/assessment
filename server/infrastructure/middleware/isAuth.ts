import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_PASS } from "../../config/env";

interface DecodedUser {
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      res
        .status(403)
        .send("Forbidden. You dont have permission to do this action");
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET_PASS as string) as DecodedUser;

    const user: DecodedUser = {
      email: decoded.email,
    };

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export default isAuth;
