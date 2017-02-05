"use strict";

const express = require('express');
const router  = express.Router();
const queries = require('../db/queries.js');
const dbInsert = require('../db/db-insert');
const dateFormat = require('dateformat');

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
    //TODO show current event based on ID
    res.render('event');
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

  // ---------- TESTING

  router.get('/testing', (req,res) => {
    let eventUrl = '5a74e200-c1d2-4daf-81d2-f886f128c9be';
    queries.getEventInfo('5a74e200-c1d2-4daf-81d2-f886f128c9be')
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      console.log(err);
    });
  });

  router.post('/create', (req, res) => {
    const dates = req.body.dates;
    console.log(dates);
    // res.send('google.com');
    res.json({url: 'google.com'});
  });


  return router;
}
