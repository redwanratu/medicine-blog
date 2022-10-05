const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

// lacate config file
dotenv.config({ path: './config.env' });

//Connect database
const DB = process.env.DB;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('database connected');
  });

// Connect to the server

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('server listening....');
});
