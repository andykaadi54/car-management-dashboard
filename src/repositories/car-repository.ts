import { CarsModel } from "../models/cars";

class CarsRepository {
  static getAll() {
    return CarsModel.query();
  }

  static getById(carId: number) {
    return CarsModel.query().findById(carId);
  }

  static create(carData: any, userId: number) {
    return CarsModel.query().insertGraph({ ...carData, created_by: userId });
  }

  static update(carId: number, carData: any, userId: number) {
    return CarsModel.query()
      .findById(carId)
      .patch({ ...carData, updated_by: userId });
  }

  static delete(carId: number, userId: number) {
    return CarsModel.query()
      .findById(carId)
      .patch({ deleted_by: userId })
      .delete();
  }
}

export { CarsRepository };
