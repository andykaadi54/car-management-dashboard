import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.integer("price").notNullable();
    table.string("image", 255).notNullable();
    table.integer("created_by").unsigned().references("id").inTable("users");
    table.integer("updated_by").unsigned().references("id").inTable("users");
    table.integer("deleted_by").unsigned().references("id").inTable("users");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
