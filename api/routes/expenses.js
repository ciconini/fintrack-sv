const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Expense = require('../models/expense');
const FilterOptions = require('../models/filter-options');

const expenseFields = '_id name value type date';

router.get('/', (req, res, next) => {
  Expense.find()
    .select(expenseFields)
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        status: 200,
        success: true,
        expenses: docs
      }
      console.log(docs);
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        success: false,
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

router.post('/filter', async (req, res, next) => {
  const filterOptions = new FilterOptions({...req.body});
  let query = {
    date: {
      $gte: filterOptions.dateStart,
      $lt: filterOptions.dateEnd
    }
  }
  if (filterOptions.type) {
    query.type = filterOptions.type
  }
  const page = filterOptions.page || 0;
  const limit = filterOptions.limit || 10;
  Expense.find(query)
    .select(expenseFields)
    .sort({ date: filterOptions.order === 'ASC' ? 1 : -1 })
    .limit(filterOptions.limit)
    .skip(page * limit)
    .exec()
    .then(docs => {
      Expense.countDocuments(query)
        .exec()
        .then(count => {
          const response = {
            totalCount: count,
            status: 200,
            success: true,
            expenses: docs,
            query: query
          }
          console.log(docs);
          res.status(200).json(response)
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        success: false,
        error: err
      })
    })
})

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
  Expense.findOneAndUpdate({ _id: id }, { $set: req.body }, {new: true})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.error(err);
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

router.post('/value', (req, res, next) => {
  const filterOptions = new FilterOptions({...req.body});
  let query = {
    date: {
      $gte: filterOptions.dateStart,
      $lt: filterOptions.dateEnd
    }
  }
  if (filterOptions.type) {
    query.type = filterOptions.type
  }
  Expense.aggregate([
    { $match: query },
    { $group: {_id: null, value: {$sum: '$value'}}}
  ]).then(result => {
    res.status(200).json(result[0].value)
  }).catch(error => {
    res.status(500).json({
      status: 500,
      success: false,
      error: err
    })
  })
})

module.exports = router;