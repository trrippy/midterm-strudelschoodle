exports.up = function(knex, Promise) {
  return knex.schema.table('events', (table) => {
    table.string('organizer');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', (table) => {
    table.dropColumn('organizer');
  })
};
