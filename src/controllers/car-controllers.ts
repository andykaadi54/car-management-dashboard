import { Request, Response } from "express";
import cloudinary from "../middleware/cloudinary";
import { CarsModel } from "../db/models/cars";

export const get = async (req: Request, res: Response) => {
  try {
    const cars = await CarsModel.query();
    return res.json(cars);
  } catch (error) {
    return res.status(500).json({ error: "Gagal mengambil daftar mobil" });
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Tidak ada file gambar yang diunggah" });
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, async (error, result: any) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Gagal mengunggah gambar ke Cloudinary" });
      }

      const imageUrl = result.secure_url;

      try {
        const newCar = await CarsModel.query().insert({
          name,
          price,
          image: imageUrl,
          created_at: new Date(),
          updated_at: new Date(),
        });
        return res.json(newCar);
      } catch (err) {
        return res
          .status(500)
          .json({ error: "Gagal menambahkan mobil ke database" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Gagal menambahkan mobil" });
  }
};

export const getById = async (req: Request, res: Response) => {
  const carId = Number(req.params.id);
  try {
    const car = await CarsModel.query().findById(carId);

    if (!car) {
      return res.status(404).json({ error: "Mobil tidak ditemukan" });
    }

    return res.json(car);
  } catch (error) {
    return res.status(500).json({ error: "Gagal mengambil data mobil" });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const carId = Number(req.params.id);
  try {
    const deletedCar = await CarsModel.query().deleteById(carId);

    if (deletedCar) {
      return res.json({ message: "Mobil berhasil dihapus" });
    } else {
      return res.status(404).json({ error: "Mobil tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Gagal menghapus mobil" });
  }
};

export const updateById = async (req: Request, res: Response) => {
  const carId = Number(req.params.id);
  try {
    const { name, price } = req.body;

    const updatedCar = await CarsModel.query().findById(carId).patch({
      name,
      price,
      updated_at: new Date(),
    });

    if (updatedCar) {
      return res.json({ message: "Data Mobil berhasil di modifikasi" });
    } else {
      return res.status(404).json({ error: "Mobil tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Gagal memodifikasi data mobil" });
  }
};

module.exports = {
  get,
  getById,
  post,
  deleteById,
  updateById,
};
