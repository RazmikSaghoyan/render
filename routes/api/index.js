'use strict';

const express = require('express');

const userRoutes = require('./user');
const categoryRoute = require('./category');
const announcementRoute = require('./announcement');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoute);
router.use('/announcements', announcementRoute);

module.exports = router;
