"use strict";

const express = require('express');
const router  = express.Router();
const queries = require('../db/queries.js');
const dbInsert = require('../db/db-insert');



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
    //pass form data
    //render to event page
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
    });
  });

  router.post('/test', (req, res) => {

    const dates = req.body.dates;
    console.log(dates);
    // res.send('google.com');
    res.json({url: 'google.com'});
  });


  return router;
}
