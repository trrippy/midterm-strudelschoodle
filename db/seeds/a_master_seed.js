
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let eventId = [];
  console.log("inital knex", knex)
  return knex('events').del()
    .then(function() {
      // Inserts seed entries
      return knex.insert([{
        title: 'Party at Dustins',
        description: 'It\'s not fun at all',
        owner_name: 'Dustin',
        owner_email: 'dustin@email.com'
      },
      {
        title: 'End of the world party',
        description: 'Just kidding yall need to calm down',
        owner_name: 'Miles',
        owner_email: 'miles@email.com'
      },
      {
        title: 'The Deploraball',
        description: 'MAKE CANADA GREAT AGAIN',
        owner_name: 'Wes',
        owner_email: 'wes@email.com'
      },
      {
        title: 'Online dnd session',
        description: 'you are not prepared',
        owner_name: 'wezl3y',
        owner_email: 'wez3@email.com'
      },
      {
        title: 'sexy date',
        description: 'you and me bb',
        owner_name: 'futureWes',
        owner_email: 'futurewes@email.com'
      }], 'id'
      ).into('events')
    })
    .then((results) => {
      console.log("results", results);
      // For each event, create 3 timeslots
      console.log("knex is", knex)
      knex.insert(
        {
          event_id: results[0],
          start_time: '2017-02-02T15:00:18Z'
        }
      ).into('timeslots')
      .then((result) => {
        console.log("Timeslot id ", result)
      })
      .catch((err) => { console.log("err", err) })

      // results.forEach((item, index) => {
      //   console.log(item);
      //   knex.insert(
      //   {
      //     event_id: item,
      //     start_time: '2017-02-02T15:00:18Z'
      //   }
      //   ).into('timeslots')
      //   .then((result) => {
      //     console.log("Timeslot id ", result)
      //   })
      //   .catch((err) => {
      //     console.log("Error", err)
      //   })
      //   .finally((err) => {
      //     console.log("Finally", err)
      //   })
      // });


    }).catch((err) => {
      console.log(err)
    })

};
