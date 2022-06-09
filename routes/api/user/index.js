'use strict';

const express = require('express');
const path = require('path');
const { check } = require('express-validator');

const router = express.Router();
const appDir = path.dirname(require.main.filename);
const userController = require(`${appDir}/controllers/userController`);
const validate = require('../../../middlewares/validate');

const rules = [
  check(['firstName', 'lastName'])
    .not()
    .isEmpty()
    .isString()
    .isLength({ min: 2 }),
  check('password')
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
  check('email')
    .not()
    .isEmpty()
    .isEmail(),
  validate()
];

router.get('/:id', userController.get);
router.get('/', userController.getAll);
router.post('/', rules, userController.store);
router.put('/:id', rules, userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
