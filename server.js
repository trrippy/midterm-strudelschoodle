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

const title = 'Parteh';
const loc = 'My house';
const desc = 'Gun B fun';
const arrayOfTimes = ['2017-02-03T17:00:00+00:00','2017-02-03T19:00:00+00:00']
dbInsert.createEvent(title, loc, desc, arrayOfTimes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
