
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let eventId = [];
  return knex('events').del()
    .then(function() {
      // Inserts seed entries
      return knex.insert([{
        id: 1,
        title: 'Party at Dustins',
        description: 'It\'s not fun at all',
        owner_name: 'Dustin',
        owner_email: 'dustin@email.com'
      },
      {
        id: 2,
        title: 'End of the world party',
        description: 'Just kidding yall need to calm down',
        owner_name: 'Miles',
        owner_email: 'miles@email.com'
      },
      {
        id: 3,
        title: 'The Deploraball',
        description: 'MAKE CANADA GREAT AGAIN',
        owner_name: 'Wes',
        owner_email: 'wes@email.com'
      },
      {
        id: 4,
        title: 'Online dnd session',
        description: 'you are not prepared',
        owner_name: 'wezl3y',
        owner_email: 'wez3@email.com'
      },
      {
        id: 5,
        title: 'sexy date',
        description: 'you and me bb',
        owner_name: 'futureWes',
        owner_email: 'futurewes@email.com'
      }], 'id'
    ).into('events')
  });
};
