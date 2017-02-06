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
    console.log('event url', req.params.id);
    let templateVars = {
      moment: moment,
      url: req.params.id
    }

    // HARD CODE
    // let templateVars = {
    //   moment: moment,
    //   location: 'hey',
    //   title: 'party',
    //   description: 'lets go yall',
    //   url: '81b675b0-0357-4422-b861-b245d463cfaf',
    //   ts: ['2017-02-03T14:30:00','2017-02-03T15:30:00', '2017-02-03T18:00:00'],
    //   users: [
    //     'Dustin': {
    //       name: 'Dustin',
    //       email: 'd@email.com',
    //       // This availability must be in the SAME order as the timeslots
    //       // AKA if availability[0] is true, Dustin can make it for the ts[0] timeslot.
    //       availability: [false, true, false]
    //     },
    //     'Wes': {
    //       name: 'Wes',
    //       email: 'w@email.com',
    //       availability: [false, false, false]
    //     }
    //   ]
    // }


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
              console.log(userObj);
              userArr.push(userObj);
              console.log('lool', results.length);
              if (index === loops - 1){
                templateVars.users = userArr;
                res.render('event', templateVars);
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
