const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const expensesRoutes = require('./api/routes/expenses');
const incomesRoutes = require('./api/routes/incomes');

// Log when calls are made
app.use(morgan('dev'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use('/expenses', expensesRoutes);
app.use('/incomes', incomesRoutes);

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