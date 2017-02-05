"use strict";
const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');
const dbInsert = require('../db/db-insert');
const dateFormat = require('dateformat');
<<<<<<< HEAD
=======
const moment = require('moment');
>>>>>>> db1cfd44845b1bb46b6e9432b09c5a954bf29ab9

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
      moment: moment
    };
    const eventInfo = queries.getEventInfo(req.params.id)
    .then((results) => {
      templateVars.location = results.location;
      templateVars.title = results.title;
      templateVars.description = results.description;
      templateVars.url = results.unique_url;
    })
    .then(results => {
      const timeSlot = queries.getTimeslotsForEvent(req.params.id)
      .then((results) => {

        const allTimes = [];
        for(let i = 0; i < results.length; i++) {
          allTimes.push(results[i].start_time);
        }
        templateVars.ts = allTimes;
        console.log(templateVars);
        res.render('event', templateVars);
      });
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
        let testing = dateFormat(req.body['date'+String(x)],"yyyy-mm-dd'T'HH:MM:ss");
        let arrLength = 0;
        if (typeof req.body['time'+String(x)] === 'string') {
          arrLength = 1;
          var temp = dateFormat(req.body['date'+String(x)],"yyyy-mm-dd'T'" + req.body['time'+ String(x)])
          dates+='{ "time'+String(x)+'":["'+temp+'"],';
          arrEventTimes.push(temp);
        } else {
          arrLength = req.body['time'+String(x)];
          dates+='{ "time'+String(x)+'":[';
          arrLength.forEach((item,index) => {
            let temp = dateFormat(req.body['date'+String(x)],"yyyy-mm-dd'T'" + req.body['time'+ String(x)][index]);
            arrEventTimes.push(temp);
            dates+='"'+ temp +'",';
          })
          dates+="],"
        }
      dates+="},";
    }
    dates+="}]";
    dates = dates.replace(/],}/g, ']}');
    dates = dates.replace(/,{}/g, '');
    dates = dates.replace(/]}]/g, ']}');
    dates = dates.replace(/]},}]/g, ']}}');
    dates = dates.replace(/,]}/g, ']}');
// ------------------------------------------------------------------------------

    dbInsert.createEvent(title, loc, desc, arrEventTimes);
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

  router.post('/event/:id', (req, res) => {
    let name = req.body.guest_name;
    console.log('name', name);
    let url = req.params.id;
    console.log('url', url);
    let timeslot = ['2017-02-03 14:00:00+00'];

// 81b675b0-0357-4422-b861-b245d463cfaf EVENT 9 url

    // res.send(req.body);
    // queries.getParticipantsForEvent();
    dbInsert.createParticipant(name, url, timeslot);

    res.redirect("/event/81b675b0-0357-4422-b861-b245d463cfaf");
  });
  return router;
}
