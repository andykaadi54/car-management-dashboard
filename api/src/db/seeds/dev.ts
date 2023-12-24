import { Knex } from "knex";
import { UsersService } from "../../services/user-services";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("cars").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      name: "super_admin",
      email: "super_admin@gmail.com",
      password: await UsersService.hashPassword("123456"),
      role: "superadmin",
    },
  ]);

  await knex("cars").insert([
    {
      id: 1,
      name: "Toyota Camry",
      price: 35000,
      image: "toyota_camry.jpg",
      created_by: 1,
      updated_by: 1,
      deleted_by: null,
    },
    {
      id: 2,
      name: "Honda Civic",
      price: 30000,
      image: "honda_civic.jpg",
      created_by: 1,
      updated_by: 1,
      deleted_by: null,
    },
    {
      id: 3,
      name: "Ford Mustang",
      price: 45000,
      image: "ford_mustang.jpg",
      created_by: 1,
      updated_by: 1,
      deleted_by: null,
    },
  ]);
}
