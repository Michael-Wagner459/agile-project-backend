const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dealRoutes = require('./routes/dealsRoutes');
const companyRoutes = require('./routes/companyRoutes');

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/deals', dealRoutes);
app.use('/api/companies', companyRoutes);

//Error handling middleware in case errors werent previously caught
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
