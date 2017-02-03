
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
      },
      {
        id: 2,
        title: 'End of the world party',
        description: 'Just kidding yall need to calm down',
      },
      {
        id: 3,
        title: 'The Deploraball',
        description: 'MAKE CANADA GREAT AGAIN',
      },
      {
        id: 4,
        title: 'Online dnd session',
        description: 'you are not prepared',
      },
      {
        id: 5,
        title: 'sexy date',
        description: 'you and me bb',
      }], 'id'
    ).into('events')
  });
};
