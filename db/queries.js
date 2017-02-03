
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {

  // TODO: insert event into database
    // this includes timeslots

  // TODO: insert participant infro
    // everything else

  // TODO: display event info
    // this will be complicated
    // 1. lets get event description
    // 2. lets get timeslots

  getEventInfo: () => {
    knex
      .select("*")
      .from("events")
      .then((results) => {
        console.log(results);
        return results;
    })
  }
}
