
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function() {
      // Inserts seed entries
      return knex.insert([{
        id: 1,
        title: 'Party at Dustins',
        location: 'Dustins house'
        description: 'Its not fun at all',
        unique_url: 'url1'
      },
      {
        id: 2,
        title: 'End of the world party',
        location: 'Dustins house'
        description: 'Just kidding yall need to calm down',
        unique_url: 'url2'

      },
      {
        id: 3,
        title: 'The Deploraball',
        location: 'Dustins house'
        description: 'MAKE CANADA GREAT AGAIN',
        unique_url: 'url3'
      },
      {
        id: 4,
        title: 'Online dnd session',
        location: 'Dustins house'
        description: 'you are not prepared',
        unique_url: 'url4'
      },
      {
        id: 5,
        title: 'sexy date',
        location: 'Dustins house'
        description: 'you and me bb',
        unique_url: 'url5'
      }], 'id'
    ).into('events')
  });
};
