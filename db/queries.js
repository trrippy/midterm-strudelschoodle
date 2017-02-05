
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {

  getAllEventsInfo: () => {
    return knex
      .select("*")
      .from("events")
      .then((results) => {
        return results;
    })
  },

  getEventInfo: (uuid) => {
    return knex('events')
    .select('*')
    .where('unique_url', uuid)
    .then ((results) => {
      return results[0];
    })
    .catch((err) => {
      console.log(err);
    })
  },

  // Return timeslots given an event id
  getTimeslotsForEvent: (uuid) => {
    return knex('timeslots')
      .join('events', 'timeslots.event_id', '=', 'events.id')
      .select('start_time')
      .where('unique_url', '=', uuid)
      .orderBy('start_time')
      .then ((results) => {
        return results;
    })
    .catch((err) => {
      console.log(err);
    })
  },
  // Returns participants given an event id
  getParticipantsForEvent: (uuid) => {
    return knex('participants')
    .join('events', 'participants.event_id', '=', 'events.id')
    .select('participants.id', 'name', 'email')
    .where('unique_url', '=', uuid)
    .then ((results) => {
      return results
    })
    .catch((err) => {
      console.log(err);
    })
  },
  // Rreturns timeslots for
  // getTimeslotsForParticipants: (uuid) => {
  //   return knex('timeslots')
  //   .join('events', 'timeslots.event_id', '=', 'events.id')
  //   .select('start_time')
  //   .where('unique_url', '=', uuid)
  //   .orderBy('start_time');
  // }
  // TODO: a list
}
