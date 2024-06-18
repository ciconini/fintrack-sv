const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Income = require('../models/income');

router.get('/', (req, res, next) => {
  Income.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs)
    })
    .catch(err => {
      res.status(500).json({error: err})
    });
});

router.post('/', (req, res, next) => {
  const income = new Income({
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    value: req.body.value,
    date: req.body.date
  });
  income
    .save()
    .then(doc => {
      res.status(201).json(doc)
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
});

router.get('/:incomeId', (req, res, next) => {
  const id = req.params.incomeId;
  Income.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({message: "No income found"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    });
});

router.patch('/:incomeId', (req, res, next) => {
  const id = req.params.incomeId;
  const updateOpts = {};
  for(const options of req.body) {
    updateOpts[options.propName] = options.value;
  }
  Income.findOneAndUpdate({ _id: id }, { $set: updateOpts })
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

router.delete('/:incomeId', (req, res, next) => {
  const id = req.params.incomeId;
  Income.findOneAndDelete({ _id: id })
    .exec()
    .then(result => {
      if(result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({message: "Income not found"})
      }
    })
    .catch(err => {
      res.status(500).json({error: err})
    });
});

module.exports = router;