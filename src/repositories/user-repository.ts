import { UsersModel, User } from "../models/users";

class UsersRepository {
  static async createUser(userData: any): Promise<User> {
    try {
      const newUser = await UsersModel.query().insertAndFetch(userData);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Gagal membuat pengguna.");
    }
  }

  static async getUserByEmail(email: string): Promise<User | undefined> {
    return UsersModel.query().findOne({ email });
  }

  static async getUserById(id: number): Promise<User | undefined> {
    return UsersModel.query().findById(id);
  }
}

export { UsersRepository };
