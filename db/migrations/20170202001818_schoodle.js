
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.createTable('events', (table) => {
      table.increments();
      table.string('title');
      table.string('description');
      table.string('owner_name');
      table.string('owner_email');
    }),
    knex.schema.createTable('participants', (table) => {
      table.increments();
      table.string('name');
      table.integer('event_id').references('id').inTable('events');
    }),
    knex.schema.createTable('timeslots', (table) => {
      table.increments();
      table.dateTime('start_time');
      table.dateTime('end_time');
      table.integer('event_id').references('id').inTable('events');
    }),
    knex.schema.createTable('availability', (table) => {
      table.increments();
      table.integer('participant_id').references('id').inTable('participants');
      table.integer('timeslot_id').references('id').inTable('timeslots');
    })
  ]);
}
exports.down =(knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('availability'),
    knex.schema.dropTableIfExists('timeslots'),
    knex.schema.dropTableIfExists('participants'),
    knex.schema.dropTableIfExists('events')
  ])
};
