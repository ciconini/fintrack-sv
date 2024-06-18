const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const expensesRoutes = require('./api/routes/expenses');
const incomesRoutes = require('./api/routes/incomes');
const typesRoutes = require('./api/routes/types');

mongoose.connect('mongodb+srv://fintrack:PgZjGqH8uFgf7VLi@fintrack.bdqgqr3.mongodb.net/?retryWrites=true&w=majority&appName=fintrack', 
  // {
  //   useMongoClient: true
  // }
);

// Log when calls are made
app.use(morgan('dev'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // standard browser call Options
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({})
  }
  next();
})

// Routes
app.use('/expenses', expensesRoutes);
app.use('/incomes', incomesRoutes);
app.use('/types', typesRoutes);

// Handle errors
app.use((req, res, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
})

module.exports = app;