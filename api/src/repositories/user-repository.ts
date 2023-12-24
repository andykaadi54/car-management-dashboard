import { UsersModel, User } from "../models/users";

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin" | "member";
}

class UsersRepository {
  static async createUser(userData: UserData): Promise<User> {
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
