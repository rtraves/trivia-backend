var express = require('express');
var app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use(routes);
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('database connected'));

app.listen(process.env.PORT, () => {
  console.log("The API is running on port " + process.env.PORT+"...");
})