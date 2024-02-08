import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/user-services";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token tidak ada" });
    }

    const decodedToken = UsersService.verifyToken(token);

    if (!decodedToken) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Token tidak valid" });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Kesalahan otentikasi:", error);
    return res.status(401).json({ error: "Unauthorized - Otentikasi gagal" });
  }
};
