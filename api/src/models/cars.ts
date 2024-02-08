import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  id!: number;
  name!: string;
  price!: number;
  image!: string;
  created_by!: number;
  updated_by!: number;
  deleted_by!: number;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
