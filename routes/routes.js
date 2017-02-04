"use strict";

const express = require('express');
const router  = express.Router();
const queries = require('../db/queries.js');
const dbInsert = require('../db/db-insert');
const dateFormat = require('dateformat');
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
    //pass form data
    //render to event page

    //81b675b0-0357-4422-b861-b245d463cfaf
    const timeSlot = getTimeslotsForEvent(req.params.id);
    res.render('event', { ts: timeSlot });
  });

  router.delete('/event/:id' , (req, res) => {

  router.post('/create', (req, res) => {
    //pass form data
    //render to event page
    console.log(req.body);
    let title = req.body.title;
    let location = req.body.location;
    let desc = req.body.description;
    let date = req.body.date0;
    let newdate = new Date();
    let dateObj = dateFormat(date,
      "fullDate");
    let numDates = 0;
    //rlet dates = [];

    let dateValues = calculateDates(req.body);;

    // let obj = req.body;
    // for(let date in obj) {
    //     if(/^date/.test(obj))
    //       dates.push(date = {});
    // }
    // console.log(dates);
    let dates = "[{";
    for(var x=0; x<dateValues; x++) {
      dates+="date"+String(x)+":";
      //for(var y=0; y<dateValues[1]; y++){
          //for the time values
          var tempnew = dateFormat(req.body['date'+String(x)], 'fullDate');
          var temp = req.body['time'+ String(x)];
          tempnew=tempnew +":"+temp;
          console.log(temp);
            dates+="{ time"+String(x)+":["+String(tempnew)+"],";

      //}
        dates+="},{";
    }
    dates+="}]";
    dates.replace(/)

    console.log(dates);
    // dateObj: {
    //   time0: req.body.time0[0]+":"+req.body.time0[1]
    //   }
    // }]
    // console.log(dates);
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
