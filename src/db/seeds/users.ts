import { Knex } from "knex";
import { UsersService } from "../../services/user-services";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      name: "super_admin",
      email: "super_admin@gmail.com",
      password: UsersService.hashPassword("123456"),
      role: "superadmin",
    },
  ]);
}
