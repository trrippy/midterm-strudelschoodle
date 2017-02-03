
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('availability').del()
    .then(function () {
      return knex.insert([
        {
          id: 1,
          participant_id: 1,
          timeslot_id: 1,
          is_available: false
        },
        {
          id: 2,
          participant_id: 1,
          timeslot_id: 2,
          is_available: false
        },
        {
          id: 3,
          participant_id: 1,
          timeslot_id: 3,
          is_available: false
        },
        {
          id: 4,
          participant_id: 2,
          timeslot_id: 1,
          is_available: false
        },
        {
          id: 5,
          participant_id: 2,
          timeslot_id: 2,
          is_available: false
        },
        {
          id: 6,
          participant_id: 2,
          timeslot_id: 3,
          is_available: false
        },
        {
          id: 7,
          participant_id: 3,
          timeslot_id: 1,
          is_available: false
        },
        {
          id: 8,
          participant_id: 3,
          timeslot_id: 2,
          is_available: false
        },
        {
          id: 9,
          participant_id: 3,
          timeslot_id: 3,
          is_available: false
        },
        {
          id: 10,
          participant_id: 4,
          timeslot_id: 4,
          is_available: false
        },
        {
          id: 11,
          participant_id: 4,
          timeslot_id: 5,
          is_available: false
        },
        {
          id: 12,
          participant_id: 4,
          timeslot_id: 6,
          is_available: false
        },
        {
          id: 13,
          participant_id: 5,
          timeslot_id: 4,
          is_available: false
        },
        {
          id: 14,
          participant_id: 5,
          timeslot_id: 5,
          is_available: false
        },
        {
          id: 15,
          participant_id: 5,
          timeslot_id: 6,
          is_available: false
        },
        {
          id: 16,
          participant_id: 6,
          timeslot_id: 4,
          is_available: false
        },
        {
          id: 17,
          participant_id: 6,
          timeslot_id: 5,
          is_available: false
        },
        {
          id: 18,
          participant_id: 6,
          timeslot_id: 6,
          is_available: false
        },
        {
          id: 19,
          participant_id: 7,
          timeslot_id: 7,
          is_available: false
        },
        {
          id: 20,
          participant_id: 7,
          timeslot_id: 8,
          is_available: false
        },
        {
          id: 21,
          participant_id: 7,
          timeslot_id: 9,
          is_available: false
        },
        {
          id: 22,
          participant_id: 8,
          timeslot_id: 7,
          is_available: false
        },
        {
          id: 23,
          participant_id: 8,
          timeslot_id: 8,
          is_available: false
        },
        {
          id: 24,
          participant_id: 8,
          timeslot_id: 9,
          is_available: false
        },
        {
          id: 25,
          participant_id: 9,
          timeslot_id: 7,
          is_available: false
        },
        {
          id: 26,
          participant_id: 9,
          timeslot_id: 8,
          is_available: false
        },
        {
          id: 27,
          participant_id: 9,
          timeslot_id: 9,
          is_available: false
        }
      ]).into('availability')
  });
};
