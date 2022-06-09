'use strict';

const express = require('express');
const path = require('path');
const {check} = require('express-validator');

const router = express.Router();
const appDir = path.dirname(require.main.filename);
const categoryController = require(`${appDir}/controllers/categoryController`);
const validate = require('../../../middlewares/validate');

const rules = [
  check('title')
    .not()
    .isEmpty()
    .isString()
    .isLength({ min: 2 }),
  check('parentId')
    .isNumeric()
    .optional({ nullable: true, checkFalsy: true }),
  validate()
];

router.get('/:id', categoryController.get);
router.get('/', categoryController.getAll);
router.post('/',  rules, categoryController.store);
router.put('/:id', rules, categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router;
