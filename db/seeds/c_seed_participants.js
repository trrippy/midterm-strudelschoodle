
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('participants').del()
    .then(function () {
      return knex.insert([
        {
          id: 1,
          event_id: 1,
          name: 'bot1',
          email: 'bot1@email.com'
        },
        {
          id: 2,
          event_id: 1,
          name: 'bot2',
          email: 'bot2@email.com'
        },
        {
          id: 3,
          event_id: 1,
          name: 'bot3',
          email: 'bot3@email.com'
        },
        {
          id: 4,
          event_id: 2,
          name: 'bot4',
          email: 'bot4@email.com'
        },
        {
          id: 5,
          event_id: 2,
          name: 'bot5',
          email: 'bot5@email.com'
        },
        {
          id: 6,
          event_id: 2,
          name: 'bot6',
          email: 'bot6@email.com'
       },
        {
          id: 7,
          event_id: 3,
          name: 'bot7',
          email: 'bot7@email.com'
        },
        {
          id: 8,
          event_id: 3,
          name: 'bot8',
          email: 'bot8@email.com'
        },
        {
          id: 9,
          event_id: 3,
          name: 'bot9',
          email: 'bot9@email.com'
        }], 'id'
    ).into('participants')
  });
};
