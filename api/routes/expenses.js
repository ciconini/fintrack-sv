const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Expense = require('../models/expense');

router.get('/', (req, res, next) => {
  Expense.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
});

router.post('/', (req, res, next) => {
  const expense = new Expense({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    value: req.body.value,
    date: req.body.date
  });
  expense
    .save()
    .then(doc => {
      console.log(doc);
      res.status(201).json(doc);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    });
});

router.get('/:expenseId', (req, res, next) => {
  const id = req.params.expenseId;
  Expense.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({message: "No expense found"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    });
});

router.patch('/:expenseId', (req, res, next) => {
  const id = req.params.expenseId;
  const updateOpts = {};
  for(const options of req.body) {
    updateOpts[options.propName] = options.value;
  }
  Expense.findOneAndUpdate({ _id: id }, { $set: updateOpts })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.delete('/:expenseId', (req, res, next) => {
  const id = req.params.expenseId;
  Expense.findOneAndDelete({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
});

module.exports = router;