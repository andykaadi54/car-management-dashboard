import { UsersRepository } from "../repositories/user-repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { User } from "../models/users";

class UsersService {
  static async getUserById(id: number): Promise<User | undefined> {
    return UsersRepository.getUserById(id);
  }

  static async createUser(userData: any): Promise<User> {
    return UsersRepository.createUser(userData);
  }

  static async getUserByEmail(email: string): Promise<User | undefined> {
    return UsersRepository.getUserByEmail(email);
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePasswords(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  static generateToken(userId: number): string {
    const secretKey = process.env.JWT_SECRET || "defaultSecret";
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  }

  static getUserIdFromToken(req: Request): number | null {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        const decodedToken: any = jwt.verify(
          token,
          process.env.JWT_SECRET || "defaultSecret"
        );
        return decodedToken.userId;
      } catch (error) {
        console.error("Kesalahan dalam mendekode token:", error);
        return null;
      }
    }
    return null;
  }

  static verifyToken(token: string): any {
    const secretKey = process.env.JWT_SECRET || "defaultSecret";

    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}

export { UsersService };
