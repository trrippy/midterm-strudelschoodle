"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

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

  });

  router.get('/event', (req, res) => {
    //TODO show current event based on ID
    res.render('event');
  });

  router.post('/test', (req, res) => {
    const dates = req.body.dates;
    console.log(dates);
    // res.send('google.com');
    res.json({url: 'google.com'});
  });

  router.post('/create', (req, res) => {
    res.send(req.body);  // Jeremy's almost-criminal hackery.  do not keep this.
  })

  return router;
}
