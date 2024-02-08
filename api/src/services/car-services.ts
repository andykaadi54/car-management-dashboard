import { Request } from "express";
import { cloudinary } from "../middleware/cloudinary";
import { CarsRepository } from "../repositories/car-repository";
import { UsersService } from "./user-services";
import { UploadApiResponse } from "cloudinary";

interface CarData {
  id: number;
  name: string;
  price: number;
  image: string;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  created_at: Date;
  updated_at: Date;
}

class CarsService {
  static async getAll() {
    return CarsRepository.getAll();
  }

  static async getById(carId: number) {
    return CarsRepository.getById(carId);
  }
  static async create(req: Request, carData: CarData) {
    const userId = UsersService.getUserIdFromToken(req);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { file } = req;

    if (!file || !file.buffer) {
      throw new Error("Tidak ada file gambar yang diunggah");
    }

    const fileBase64 = file.buffer.toString("base64");
    const fileData = `data:${file.mimetype};base64,${fileBase64}`;

    const cloudinaryResponse: UploadApiResponse | undefined = await new Promise<
      UploadApiResponse | undefined
    >((resolve, reject) => {
      cloudinary.uploader.upload(fileData, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });

    const imageUrl = cloudinaryResponse?.secure_url;

    if (imageUrl) {
      const newData = {
        ...carData,
        image: imageUrl,
        created_at: new Date(),
        updated_at: new Date(),
      };

      return CarsRepository.create(newData, userId);
    } else {
      throw new Error("Failed to upload image to Cloudinary");
    }
  }

  static async update(carId: number, carData: CarData, req: Request) {
    const userId = UsersService.getUserIdFromToken(req);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingCar = await CarsRepository.getById(carId);

    const { file } = req;
    if (existingCar && file && file.buffer) {
      // Jika iya, upload gambar baru ke Cloudinary dan dapatkan URL baru
      const fileBase64 = file.buffer.toString("base64");
      const fileData = `data:${file.mimetype};base64,${fileBase64}`;

      const cloudinaryResponse: UploadApiResponse | undefined =
        await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
          cloudinary.uploader.upload(fileData, (error, result) => {
            if (error) reject(error);
            resolve(result);
          });
        });

      // Perbarui URL gambar di data mobil yang akan diupdate
      carData.image = cloudinaryResponse!.secure_url;
    } else if (existingCar) {
      // Jika tidak ada file baru diunggah, gunakan URL gambar yang sudah ada
      carData.image = existingCar.image;
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
