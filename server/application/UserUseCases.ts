import IUser from "../domain/IUser";
import { UserAlreadyExistsError } from "../domain/UserAlreadyExistsError";
import UserRepository from "../infrastructure/UserRepository";

class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: IUser): Promise<IUser> {
    const foundUser = await this.userRepository.findUserByEmail(user.email);
    if (foundUser) {
      throw new UserAlreadyExistsError();
    }

    return this.userRepository.createUser(user);
  }
}

export default UserUseCases;
