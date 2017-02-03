
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

  getAllEventsInfo: () => {
    return knex
      .select("*")
      .from("events")
      .then((results) => {
        return results;
    })
  },
  // Return timeslots given an event id
  getTimeslotsForEvent: (uuid) => {
    return knex('timeslots')
      .join('events', 'timeslots.event_id', '=', 'events.id')
      .select('start_time')
      .where('unique_url', '=', uuid)
      .then ((results) => {
        return results;
    })
  },
  // Returns participants given an event id
  getParticipantsForEvent: (uuid) => {
    return knex('participants')
    .join('events', 'participants.event_id', '=', 'events.id')
    .select('participants.id', 'name', 'email', 'admin')
    .where('unique_url', '=', uuid)
    .then ((results) => {
      return results;
    })
  }
  // TODO: a list
}
