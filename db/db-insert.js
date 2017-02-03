
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

const uuid        = require('./uuid');

module.exports = {
  // given 1) event title, 2)location, 3) description, 4)organizer, 5)email 6)timeslots
  createEvent: (eventTitle, loc, desc, arrOfTimeslots) => {
    let eventId = knex
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

  createParticipant: (name, email, uuid, arrOfTimeslots) => {

  }
}


