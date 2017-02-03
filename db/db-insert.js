
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {
  // given 1) event title, 2)location, 3) description, 4)organizer, 5)email 6)timeslots
  createEvent: (eventTitle, loc, desc, arrOfTimeslots) => {

    knex('events')
    .insert({
        // id: 6, // this will be changed later, auto increment is making it conflict and throw err
        title: eventTitle,
        location: loc,
        description: desc,
        unique_url: 'newurl' //this will be uuid()
      })
    .then((id) => {
      console.log(id);
      arrOfTimeslots.forEach((item) => {
        knex('timeslots')
        .insert({
          // id: 6,
          event_id: id,
          start_time: item
        })
      })
    })
  }
}


