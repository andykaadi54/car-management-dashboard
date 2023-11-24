import { UsersModel, User } from "../models/users";

class UsersRepository {
  static async createUser(userData: any): Promise<User> {
    return UsersModel.query().insert(userData);
  }

  static async getUserByEmail(email: string): Promise<User | undefined> {
    return UsersModel.query().findOne({ email });
  }

  static async getUserById(id: number): Promise<User | undefined> {
    return UsersModel.query().findById(id);
  }
}

export { UsersRepository };
