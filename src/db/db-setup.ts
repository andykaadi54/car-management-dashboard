const knex = require("knex");
const knexfile = require("./knexfile");
const { Model } = require("objection");

function setupDb() {
  const db = knex(knexfile.development);

  Model.knex(db);

  // Update the migration file to include the new columns
  return db.migrate.latest();
}

export { setupDb };
