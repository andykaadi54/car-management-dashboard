import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      id: 1,
      name: "Toyota Camry",
      price: 35000,
      image: "toyota_camry.jpg",
    },
    {
      id: 2,
      name: "Honda Civic",
      price: 30000,
      image: "honda_civic.jpg",
    },
    {
      id: 3,
      name: "Ford Mustang",
      price: 45000,
      image: "ford_mustang.jpg",
    },
  ]);
}
