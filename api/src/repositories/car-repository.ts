import { CarsModel } from "../models/cars";

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

class CarsRepository {
  static getAll() {
    return CarsModel.query();
  }

  static getById(carId: number) {
    return CarsModel.query().findById(carId);
  }

  static create(carData: CarData, userId: number) {
    return CarsModel.query().insertAndFetch({
      ...carData,
      created_by: userId,
    });
  }

  static update(carId: number, carData: CarData, userId: number) {
    return CarsModel.query()
      .findById(carId)
      .patch({ ...carData, updated_by: userId, updated_at: new Date() });
  }

  static delete(carId: number, userId: number) {
    return CarsModel.query()
      .findById(carId)
      .patch({ deleted_by: userId })
      .then(() => {
        return CarsModel.query().deleteById(carId);
      });
  }
}

export { CarsRepository };
