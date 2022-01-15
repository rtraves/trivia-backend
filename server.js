var express = require('express');
var app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

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