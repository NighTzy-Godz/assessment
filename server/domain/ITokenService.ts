import IUser from "./IUser";

interface ITokenService {
  generateToken(user: IUser): string;
}

export default ITokenService;
