const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handling GET /expenses'
  });
});

router.post('/', (req, res, next) => {
  const expense = {
    type: req.body.type,
    value: req.body.value,
    date: req.body.date
  }
  res.status(201).json({
    message: 'handling POST /expenses',
    expense: expense
  });
});

router.get('/:expenseId', (req, res, next) => {
  const id = req.params.expenseId;
  res.status(200).json({
    message: `data return for expense ID: ${id}`,
    id: id
  })
});

router.patch('/:expenseId', (req, res, next) => {
  const id = req.params.expenseId;
  res.status(200).json({
    message: `updated data return for expense ID: ${id}`,
    id: id
  })
});

router.delete('/:expenseId', (req, res, next) => {
  const id = req.params.expenseId;
  res.status(200).json({
    message: `delete return for expense ID: ${id}`,
    id: id
  })
});

module.exports = router;