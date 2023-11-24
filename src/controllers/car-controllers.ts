import { Request, Response } from "express";
import { CarsService } from "../services/car-services";

class CarsController {
  static async get(req: Request, res: Response) {
    try {
      const cars = await CarsService.getAll();
      return res.json(cars);
    } catch (error) {
      return res.status(500).json({ error: "Gagal mengambil daftar mobil" });
    }
  }

  static async post(req: Request, res: Response) {
    try {
      const { name, price } = req.body;
      const newCar = await CarsService.create(req, { name, price });
      return res.json(newCar);
    } catch (error) {
      return res.status(500).json({ error: "Gagal menambahkan mobil" });
    }
  }

  static async getById(req: Request, res: Response) {
    const carId = Number(req.params.id);
    try {
      const car = await CarsService.getById(carId);

      if (!car) {
        return res.status(404).json({ error: "Mobil tidak ditemukan" });
      }

      return res.json(car);
    } catch (error) {
      return res.status(500).json({ error: "Gagal mengambil data mobil" });
    }
  }

  static async deleteById(req: Request, res: Response) {
    const carId = Number(req.params.id);
    try {
      const deletedCar = await CarsService.delete(carId, req);

      if (deletedCar) {
        return res.json({ message: "Mobil berhasil dihapus" });
      } else {
        return res.status(404).json({ error: "Mobil tidak ditemukan" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Gagal menghapus mobil" });
    }
  }

  static async updateById(req: Request, res: Response) {
    const carId = Number(req.params.id);
    try {
      const { name, price } = req.body;
      const updatedCar = await CarsService.update(carId, { name, price }, req);

      if (updatedCar) {
        return res.json({ message: "Data Mobil berhasil di modifikasi" });
      } else {
        return res.status(404).json({ error: "Mobil tidak ditemukan" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Gagal memodifikasi data mobil" });
    }
  }
}

export { CarsController };
