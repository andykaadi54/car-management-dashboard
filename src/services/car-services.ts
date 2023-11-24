import { Request } from "express";
import { cloudinary } from "../middleware/cloudinary";
import { CarsRepository } from "../repositories/car-repository";
import { UsersService } from "./user-services";

class CarsService {
  static async getAll() {
    return CarsRepository.getAll();
  }

  static async getById(carId: number) {
    return CarsRepository.getById(carId);
  }
  static async create(req: Request, carData: any) {
    const userId = UsersService.getUserIdFromToken(req);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { file } = req;

    if (!file) {
      throw new Error("Tidak ada file gambar yang diunggah");
    }

    const fileBase64 = file.buffer.toString("base64");
    const fileData = `data:${file.mimetype};base64,${fileBase64}`;

    const cloudinaryResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(fileData, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });

    const imageUrl = cloudinaryResponse.secure_url;

    const newData = {
      ...carData,
      image: imageUrl,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return CarsRepository.create(newData, userId);
  }

  static async update(carId: number, carData: any, req: Request) {
    const userId = UsersService.getUserIdFromToken(req);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return CarsRepository.update(
      carId,
      { ...carData, updated_at: new Date() },
      userId
    );
  }

  static async delete(carId: number, req: Request) {
    const userId = UsersService.getUserIdFromToken(req);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return CarsRepository.delete(carId, userId);
  }
}

export { CarsService };
