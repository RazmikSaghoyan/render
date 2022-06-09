'use strict';

const express = require('express');
const path = require('path');

const router = express.Router();
const appDir = path.dirname(require.main.filename);
const announcementController = require(`${appDir}/controllers/announcementController`);

router.get('/:id', announcementController.get);
router.get('/', announcementController.getAll);
router.post('/', announcementController.store);
router.put('/:id', announcementController.update);
router.delete('/:id', announcementController.delete);

module.exports = router;
