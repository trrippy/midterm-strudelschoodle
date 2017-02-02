
exports.up = function(knex, Promise) {
  return knex.schema.table('participants', function (table) {
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('participants', function (table) {
    table.dropColumn('email');
  });
};
