const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Type = require('../models/types');

router.get('/', (req, res, next) => {
  Type.find()
    .exec()
    .then(types => {
      res.status(200).json(types)
    })
    .catch(err => {
      res.status(500).json({error: err});
    })
})

router.post('/', (req, res, next) => {
  const type = new Type({
    _id: new mongoose.Types.ObjectId(),
    label: req.body.label,
    icon: req.body.icon
  });
  type.save()
    .then(doc => {
      res.status(201).json(doc);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
})

module.exports = router;