
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
    let arrOfEventTimes = [];
    let arrOfEventTimesId = [];
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

          results.forEach(item => {
            arrOfEventTimes.push(item.start_time.toISOString().substring(0,19));
            arrOfEventTimesId.push(item.id);
          })
          arrOfEventTimes.forEach((item, index) => {
            knex
            .insert([{
              participant_id: participantId,
              timeslot_id: arrOfEventTimesId[index],
              is_available: false
            }], 'id')
            .into('availability')
            .then(results => {
            })
          })
        })
        .then(results => {
          arrOfTimeslots.forEach(item => {
            let available = false;
            let index = arrOfEventTimes.indexOf(item.substring(0,19));
            let timeslotId = index;
            // console.log('arrOfEventTimes', arrOfEventTimes);
            // console.log('each item', item.substring(0,19));
            // console.log('item is type', typeof arrOfEventTimes[0]);
            // console.log('available', available);
            console.log('If this is > 0, then the check condition is working', index)
            if (index >= 0) {
              // console.log('in if');
              available = true;
              knex('availability')
              .where({
                participant_id: participantId,
                timeslot_id: arrOfEventTimesId[index]
              })
              .update('is_available', true)
              .then(results => {
                console.log(results);
              })
            }
          })
        })
      })
    })
  }
}



