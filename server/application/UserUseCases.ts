import IUser from "../domain/IUser";
import IUserRepository from "../domain/IUserRepository";
import { UserAlreadyExistsError } from "../domain/UserAlreadyExistsError";
import { UserNotFoundError } from "../domain/UserNotFoundError";
import { TokenService } from "../infrastructure/services/TokenService";

class UserUseCases {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: TokenService
  ) {}

  async fetchUserData(email: string): Promise<IUser> {
    const foundUser = await this.userRepository.findUserByEmail(email);
    if (!foundUser) {
      throw new UserNotFoundError();
    }

    return foundUser;
  }

  async createUser(user: IUser): Promise<IUser> {
    const foundUser = await this.userRepository.findUserByEmail(user.email);
    if (foundUser) {
      throw new UserAlreadyExistsError();
    }

    return this.userRepository.createUser(user);
  }

  async loginUser(email: string): Promise<string> {
    const foundUser = await this.userRepository.findUserByEmail(email);
    if (!foundUser) {
      throw new UserNotFoundError();
    }
    const token = this.tokenService.generateToken(foundUser);
    return token;
  }
}

export default UserUseCases;
