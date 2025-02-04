import IUser from "../domain/IUser";
import IUserRepository from "../domain/IUserRepository";
import User from "./UserModel";

class UserRepository implements IUserRepository {
  async createUser(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
}

export default UserRepository;
