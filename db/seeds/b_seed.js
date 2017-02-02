
exports.seed = function(knex, Promise) {
  // // Deletes ALL existing entries
  // let eventId = [];
  // knex.select('id').from('events')
  // .then((results) => {
  //   for (id in eventIdObject) {
  //   eventId.push(id);
  // };

  // return knex('timeslots').del()
  //   .then(function () {
  //     return Promise.all([
  //       // Inserts seed entries
  //                 // For each event, create 3 timeslots
  //         console.log(eventId);
  //         eventID.forEach((item, index) => {
  //           console.log(item);
  //           knex.insert([{
  //             event_id: item,
  //             start_time: '2017-02-02T15:00:18Z'
  //           },
  //           {
  //             event_id: item,
  //             start_time: '2017-02-02T17:00:18Z'
  //           },
  //           {
  //             event_id: item,
  //             start_time: '2017-02-02T19:00:18Z'
  //           }], 'id'
  //           ).into('timeslots').catch((err) => {console.log(err) })
  //         });
  //     ]);
  //   });
};
