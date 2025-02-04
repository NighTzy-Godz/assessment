import bcrypt from "bcrypt";
import IBcryptService from "../domain/IBcryptService";

export class BcryptService implements IBcryptService {
  async saltPassword(salt: number): Promise<string> {
    return await bcrypt.genSalt(salt);
  }

  async hashPassword(data: string, salt: number | string): Promise<string> {
    return await bcrypt.hash(data, salt);
  }
}
