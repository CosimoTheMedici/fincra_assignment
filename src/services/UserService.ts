import { IUser } from "../entities/User";
import { userRepository } from "../repositories/UserRepository";

export const userService = {
  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await userRepository.findByEmail(email);
    return Promise.resolve(user);
  },

  async createUser(user: IUser): Promise<IUser> {
    const createdUser = await userRepository.createUser(user);
    return Promise.resolve(createdUser);
  },
};
