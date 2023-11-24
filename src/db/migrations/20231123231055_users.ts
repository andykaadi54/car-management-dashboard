import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("email", 255).unique().notNullable();
    table.string("password", 255).notNullable();
    table.enum("role", ["superadmin", "admin", "member"]).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
