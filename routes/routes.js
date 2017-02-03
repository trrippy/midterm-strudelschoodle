"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render("index");
  });
  router.get('/create', (req,res) => {
    res.render('create');
  })
  router.post('/event/:id', (req, res) => {
    //pass form data
    //render to event page
  })
  router.delete('/event/:id' , (req, res) => {

  })
  return router;
}
