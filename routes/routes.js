"use strict";
const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');
const dbInsert = require('../db/db-insert');
const dateFormat = require('dateformat');

const moment = require('moment');

// const JSON = require('json');
let calculateDates = (json) => {
  var counter =0;
  var dateElements = [];
  for(var key in json){
    var x = "date"+String(counter);
    if(key==x){
      dateElements.push("random");
      counter+=1;
    }
  }
  return (dateElements.length);
}

module.exports = (knex) => {
  //  -------- GET
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get('/create', (req,res) => {
    res.render('create');
  });

  router.get('/event/:id', (req, res) => {
    let templateVars = {
      moment: moment,
      url: req.params.id

    }

    // adding event into to templateVars
    const eventInfo = queries.getEventInfo(req.params.id)
    .then((results) => {
      templateVars.location = results.location;
      templateVars.title = results.title;
      templateVars.description = results.description;
      templateVars.url = results.unique_url;
      templateVars.eventId = results.id;
    })
    .then(results => {
      const timeSlot = queries.getTimeslotsForEvent(req.params.id)
      .then(results => {
        const allTimes = [];
        for(let i = 0; i < results.length; i++) {
          allTimes.push(results[i].start_time);
        }
        templateVars.ts = allTimes;
        // console.log('final templateVars sent to server', templateVars);
        // res.render('event', templateVars);
      })
      .then(results => {
        // TODO search participants where event = event url
        // TODO search for that participants availability, sort it, and put it into an arraymake it into an array
        let users = {};
        queries.getParticipantsForEvent(req.params.id)
        .then(results => {
          let userArr = []
          results.forEach((item, index) => {
            let loops = results.length;
            let pName = item.name;
            let pDetails = {
              name: pName
            };

            queries.getAvailabilitiesForParticipant(item.id, templateVars.eventId)
            .then(results => {

              let pArr = [];
              results.forEach((item, index) => {
                pArr.push(item.is_available)
                  users[pName] = pDetails
              })
              pDetails.availability = pArr;
              // console.log(pName);
              // console.log(pDetails);
              // let userInsert = {
              //   [pName]:pDetails
              // }
              let userObj = {}
              userObj[pName] = pDetails;
              userArr.push(userObj);
              if (index === loops - 1){
                templateVars.users = userArr;
                function shortDelay() {
                  setTimeout(function () {
                    res.render('event', templateVars);
                  }, 500);
                }
                shortDelay();

                // res.send(templateVars);
              }
              // if ()
              // templateVars.users = userInsert;
              // console.log(templateVars);
              // console.log('I WANT THIS', userInsert);
              // console.log('users', users);
            })
          })
        })
      })
    })

  });

  // ---------- POST
  router.post('/create', (req, res) => {

    let title = req.body.title;
    let loc = req.body.location;
    let desc = req.body.description
    let arrEventTimes = [];

// This catastrophe creates a the form and builds a JSON string which is converted into the dates object;
    let dateValues = calculateDates(req.body);;
    let dates = "{";
    for(var x=0; x<dateValues; x++) {
      dates+='"date'+String(x)+'":';
        let arrLength = 0;
        if (typeof req.body['time'+String(x)] === 'string') {
          arrLength = 1;
          var temp = dateFormat(req.body['date'+String(x)],"yyyy-mm-dd'T'" + req.body['time'+ String(x)])
          dates+='{ "time'+String(x)+'":["'+temp+'"],';
          arrEventTimes.push(moment(temp).format());
        } else {
          arrLength = req.body['time'+String(x)];
          dates+='{ "time'+String(x)+'":[';
          arrLength.forEach((item,index) => {
            let temp = dateFormat(req.body['date'+String(x)],"yyyy-mm-dd'T'" + req.body['time'+ String(x)][index]);
            arrEventTimes.push(moment(temp).format());
            dates+='"'+ temp +'",';
          })
          dates+="],"
        }
      dates+="},";
    }
    dates+="}]";

    let newdates = dates.replace(/],}/g, ']}');
    // dates.repalce('')

    dates = dates.replace(/],}/g, ']}');
    dates = dates.replace(/,{}/g, '');
    dates = dates.replace(/]}]/g, ']}');
    dates = dates.replace(/]},}]/g, ']}}');
    dates = dates.replace(/,]}/g, ']}');
// ------------------------------------------------------------------------------

    dbInsert.createEvent(title, loc, desc, arrEventTimes);
              // createParticipant('admin', evtUrl, arrOfTimeslots);

    res.redirect('/');

  });
  // ---------- UPDATE
  // This is what the participants post
  // Needs to be changed with methodoverride
  router.post('/create/:id/update', (req,res) => {
  });
  // ---------- DELETE
  // this deletes a users timeslots
  router.delete('/event/:id/delete' , (req, res) => {
  });


  // router.post('/create', (req, res) => {
  //   const dates = req.body.dates;
  //   console.log(dates);
  //   // res.send('google.com');
  //   res.json({url: 'google.com'});
  // });
  //createParticipant: (participantName, eventUrl, arrOfTimeslots) => {

  router.post('/event/:id', (req, res) => {
    let name = req.body.guest_name;
    // console.log('name', name);
    let url = req.params.id;
    // console.log('url', url);
    let timeslot = [];
    // console.log(typeof req.body.guest_time === 'string');
    if ((typeof req.body.guest_time) === 'string') {
      timeslot.push(req.body.guest_time)
    } else {
      req.body.guest_time.forEach((item) => {
        timeslot.push(item);
      });//['2017-02-03 14:00:00+00'];
    }
    // console.log('name', name)
    // console.log('url', url)
    // console.log('timeslot', timeslot);


    // res.send(req.body);
    // console.log(name, url, timeslot);
    function addDelay() {
      setTimeout(function () {
        res.redirect(`/event/${url}`);
      }, 500);
    }
    addDelay();
    dbInsert.createParticipant(name, url, timeslot);
    // res.redirect(`/event/${url}`);
  });
  return router;
}
