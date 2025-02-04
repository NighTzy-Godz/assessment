import IUser from "./IUser";

interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
}

export default IUserRepository;
