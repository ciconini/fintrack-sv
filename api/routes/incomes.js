const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handling GET /incomes'
  });
});

router.post('/', (req, res, next) => {
  const income = {
    type: req.body.type,
    value: req.body.value,
    date: req.body.date
  }
  res.status(201).json({
    message: 'handling POST /incomes',
    income: income
  });
});

router.get('/:incomeId', (req, res, next) => {
  const id = req.params.incomeId;
  res.status(200).json({
    message: `data return for income ID: ${id}`,
    id: id
  })
});

router.patch('/:incomeId', (req, res, next) => {
  const id = req.params.incomeId;
  res.status(200).json({
    message: `updated data return for income ID: ${id}`,
    id: id
  })
});

router.delete('/:incomeId', (req, res, next) => {
  const id = req.params.incomeId;
  res.status(200).json({
    message: `delete return for income ID: ${id}`,
    id: id
  })
});

module.exports = router;