
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', function (table) {
      table.dropColumn('owner_name');
      table.dropColumn('owner_email');
  }),
    knex.schema.table('participants', (table) => {
      table.boolean('admin');
    }),
    knex.schema.table('availability', (table) => {
      table.boolean('is_available');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('availability', (table) => {
      table.dropColumn('is_available');
    }),
    knex.schema.table('participants', (table) => {
      table.dropColumn('admin');
    }),
    knex.schema.table('events', function (table) {
      table.string('owner_email');
      table.string('owner_name');
    })
  ])
};
