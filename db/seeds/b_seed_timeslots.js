
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('timeslots').del()
    .then(function () {
      return knex.insert([
        {
          id: 1,
          event_id: 1,
          start_time: '2017-02-02T14:01:57-08:00'
        },
        {
          id: 2,
          event_id: 1,
          start_time: '2017-02-02T14:01:57-08:00'
        },
        {
          id: 3,
          event_id: 1,
          start_time: '2017-02-02T14:01:57-08:00'
        },
        {
          id: 4,
          event_id: 2,
          start_time: '2017-02-02T14:01:57-08:00'
        },
        {
          id: 5,
          event_id: 2,
          start_time: '2017-02-02T14:01:57-08:00'
        },
        {
          id: 6,
          event_id: 2,
          start_time: '2017-02-02T14:01:57-08:00'
        },
        {
          id: 7,
          event_id: 3,
          start_time: '2017-02-02T14:01:57-08:00'
        },
        {
          id: 8,
          event_id: 3,
          start_time: '2017-02-02T14:01:57-08:00'
        },
        {
          id: 9,
          event_id: 3,
          start_time: '2017-02-02T14:01:57-08:00'
        }], 'id'
    ).into('timeslots')
  });
};
