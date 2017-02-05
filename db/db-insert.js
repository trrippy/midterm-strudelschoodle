
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

const uuid        = require('./uuid');

module.exports = {
  // given 1) event title, 2)location, 3) description, 4)organizer, 5)email 6)timeslots
  createEvent: (eventTitle, loc, desc, arrOfTimeslots) => {
    knex
    .insert([{
        title: eventTitle,
        location: loc,
        description: desc,
        unique_url: uuid()
      }], 'id')
    .into('events')
    .then((id) => {
      arrOfTimeslots.forEach((item) => {
        knex
        .insert([{
          event_id: id[0],
          start_time: item
        }])
        .into('timeslots')
        .then(results => {
          return results;
        })
        .catch(err => {
          console.log(err);
        })
      })
    })
  },
// put email back in??????
  createParticipant: (participantName, eventUrl, arrOfTimeslots) => {
    let eventId = 0;
    let participantId = 0;
    // SELECT id FROM events WHERE unique_url='uuid'
    knex('events')
    .where({
      unique_url: eventUrl
    })
    .select('id')
    // INSERT values INTO TABLE participants (event_id = id from above)
    .then(results => {
      eventId = results[0].id;
      knex
      .insert([{
        name: participantName,
        // email: participantEmail,
        event_id: results[0].id
      }], 'id')
      .into('participants')
      // return as participant_id in availability
      // INSERT VALUES INTO TABLE availablity equal to timeslots of event
      // Also make them true if arrOfTimeslots for the participant is equal to Timeslots
      .then(results => {
        participantId = results[0];
        knex('timeslots')
        .where({
          event_id: eventId
        })
        .select('start_time', 'id')
        .then(results => {
          results.forEach(item =>{
            available = arrOfTimeslots.includes(item.start_time.toISOString());
            knex
            .insert([{
              participant_id: participantId,
              timeslot_id: item.id,
              is_available: available
            }], 'id')
            .into('availability')
            .then(results => {
              return (results);
            })
          })
        });
        })
      })
    }

}
