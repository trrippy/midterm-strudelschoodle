
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('availability').del()
    .then(function () {
      return knex.insert([
        {
          id: 1,
          participant_id: 1,
          timeslot_id: 1
        },
        {
          id: 2,
          participant_id: 1,
          timeslot_id: 3
        },
        {
          id: 3,
          participant_id: 2,
          timeslot_id: 2
        },
        {
          id: 4,
          participant_id: 2,
          timeslot_id: 3
        },
        {
          id: 5,
          participant_id: 3,
          timeslot_id: 1
        },
        {
          id: 6,
          participant_id: 4,
          timeslot_id: 4
        },
        {
          id: 7,
          participant_id: 5,
          timeslot_id: 6
        },
        {
          id: 8,
          participant_id: 6,
          timeslot_id: 4
        },
        {
          id: 9,
          participant_id: 8,
          timeslot_id: 8
        }], 'id'
    ).into('availability')
  });
};
