"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/routes.js");

const queries = require('./db/queries.js');
const dbInsert = require('./db/db-insert');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

//Routes
app.use("/", usersRoutes(knex));
req,params,id
app.get('/events/:id', (req, res) => {
  let timeslots = queries.getTimeslotsForEvent(req.params.id)
  res.render('event_show', {timeslots: timeslots})
})

const title = 'Sleep';
const loc = 'Lighthouse';
const desc = 'FUN FUN FUN FUN FUN';
const arrayOfTimes = ['2017-02-03T14:00:00+00:00','2017-02-03T18:00:00+00:00']
// dbInsert.createEvent(title, loc, desc, arrayOfTimes);

const partName = 'Sadirina';
const partEmail = 'sadirinia@email.com';
const eventUuid = '5a74e200-c1d2-4daf-81d2-f886f128c9be'; // event 20
const arrayOfTimesAvail = ['2017-02-03T14:00:00.000Z'] // available for 5, but not 7
// dbInsert.createParticipant(partName, partEmail, eventUuid, arrayOfTimesAvail)

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
