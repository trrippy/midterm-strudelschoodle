exports.up = function(knex, Promise) {
  return knex.schema.table('events', (table) => {
    table.string('location');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', (table) => {
    table.dropColumn('location');
  })
};
