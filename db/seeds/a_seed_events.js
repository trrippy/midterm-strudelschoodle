
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function() {
      // Inserts seed entries
      return knex.insert([{
        id: 1,
        title: 'Party at Dustins',
        location: 'Dustin\'s house'
        description: 'It\'s not fun at all',
        unique_url: 'url1'
      },
      {
        id: 2,
        title: 'End of the world party',
        location: 'Dustin\'s house'
        description: 'Just kidding yall need to calm down',
        unique_url: 'url2'

      },
      {
        id: 3,
        title: 'The Deploraball',
        location: 'Dustin\'s house'
        description: 'MAKE CANADA GREAT AGAIN',
        unique_url: 'url3'
      },
      {
        id: 4,
        title: 'Online dnd session',
        location: 'Dustin\'s house'
        description: 'you are not prepared',
        unique_url: 'url4'
      },
      {
        id: 5,
        title: 'sexy date',
        location: 'Dustin\'s house'
        description: 'you and me bb',
        unique_url: 'url5'
      }], 'id'
    ).into('events')
  });
};
