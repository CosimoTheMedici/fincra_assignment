import { User, IUser } from "../entities/User";

export const userRepository = {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  },
  async findById(id: string): Promise<IUser | null> {
    return await User.findOne({ _id: id });
  },
  async createUser(data: IUser): Promise<IUser> {
    return new User(data).save();
  },
};
