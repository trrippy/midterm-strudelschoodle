
exports.up = function(knex, Promise) {
  return knex.schema.table('events', (table) => {
    table.string('unique_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', (table) => {
    table.dropColumn('unique_url');
  })
};
