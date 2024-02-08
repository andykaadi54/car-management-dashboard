import knex from "knex";
import knexfile from "./knexfile";
import { Model } from "objection";

function setupDb() {
  const db = knex(knexfile.development);

  Model.knex(db);
}

export { setupDb };
