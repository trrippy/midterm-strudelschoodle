
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {

  createEvent: (eventTitle, desc) => {

    knex('events')
    .insert({
        id: 6, // this will be changed later, auto increment is making it conflict and throw err
        title: eventTitle,
        description: desc,
        unique_url: 'newurl' //this will be uuid()
      })
    .then(() => {
    })
    // I will chain .then's onto each other and create timeslots
  }

}
