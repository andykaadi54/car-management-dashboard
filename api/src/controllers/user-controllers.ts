import { Request, Response } from "express";
import { UsersService } from "../services/user-services";
import { v4 as uuidv4 } from "uuid";

class UsersController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UsersService.getUserByEmail(email);

      if (
        !user ||
        !(await UsersService.comparePasswords(password, user.password))
      ) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = UsersService.generateToken(user.id);
      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async registerAdmin(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Check if the request is from a superadmin
      const userId = UsersService.getUserIdFromToken(req);
      if (!userId) {
        return res
          .status(403)
          .json({ error: "Unauthorized - Token tidak valid" });
      }

      const requestingUser = await UsersService.getUserById(userId);
      if (!requestingUser || requestingUser.role !== "superadmin") {
        return res
          .status(403)
          .json({ error: "Unauthorized - Role tidak sesuai" });
      }

      // Check if email is already in use
      const existingUser = await UsersService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email sudah terdaftar" });
      }

      const hashedPassword = await UsersService.hashPassword(password);

      const newAdmin = await UsersService.createUser({
        id: Number(uuidv4()),
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });

      return res.json({
        message: "Admin berhasil dibuat",
        admin: newAdmin,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async registerMember(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await UsersService.hashPassword(password);

      const newMember = await UsersService.createUser({
        id: Number(uuidv4()),
        name,
        email,
        password: hashedPassword,
        role: "member",
      });

      return res.json({
        message: "Member registered successfully",
        member: newMember,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getCurrentUser(req: Request, res: Response) {
    const userId = UsersService.getUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await UsersService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });
  }
}

export { UsersController };
