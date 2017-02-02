
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('events').insert({colName: 'rowValue1'}),
        knex('events').insert({colName: 'rowValue2'}),
        knex('events').insert({colName: 'rowValue3'})
      ]);
    });
};
