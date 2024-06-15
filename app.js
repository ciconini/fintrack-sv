const express = require('express');
const app = express();

const expensesRoutes = require('./api/routes/expenses')
const incomesRoutes = require('./api/routes/incomes')

app.use('/expenses', expensesRoutes);

app.use('/incomes', incomesRoutes);

module.exports = app;