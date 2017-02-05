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
    let location = req.body.location;
    let desc = req.body.description;
    let date = req.body.date0;
    let newdate = new Date();
    let dateObj = dateFormat(date,
      "fullDate");
    let numDates = 0;
    let dateValues = calculateDates(req.body);;
    let dates = "[{";
    for(var x=0; x<dateValues; x++) {
      dates+="date"+String(x)+":";
      var tempnew = dateFormat(req.body['date'+String(x)], 'fullDate');
      var temp = req.body['time'+ String(x)];
      tempnew=tempnew +":"+temp;
      dates+="{ time"+String(x)+":["+String(tempnew)+"],";
      dates+="},{";
    }
    dates+="}]";
    let newdates = dates.replace(/],}/g, ']}');
    // dates.repalce('')
    console.log(newdates);
    console.log(typeof dates);

    res.send(req.body);
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
