'use strict';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tickRoutes = require('./routes/tick.route');
const userRoutes = require('./routes/userList.route');

mongoose
  .connect('mongodb://localhost:27017/ticket', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected successfully');
  });
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', tickRoutes.routes);
app.use('/api/alfred', userRoutes.routes);

app.listen(process.env.PORT, () =>
  console.log('app is listening on url http://localhost:' + process.env.PORT)
);
