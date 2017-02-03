
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {
  // given 1) event title, 2)location, 3) description, 4)organizer, 5)email 6)timeslots
  createEvent: (eventTitle, desc, loc, arrOfTimeslots) => {

    knex('events')
    .insert({
        id: 6, // this will be changed later, auto increment is making it conflict and throw err
        title: eventTitle,
        // location: loc  This needs to be added to db
        description: desc,
        unique_url: 'newurl' //this will be uuid()
      })
    .then((id) => {
      arrOfTimeslots.forEach((item) => {
        knex
        .insert({
          id: 6,
          event_id: id
        })
      })
    })
  }
}


