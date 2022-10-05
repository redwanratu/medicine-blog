const express = require('express');
const tagController = require('../controllers/tagController');

const router = express.Router();

router.route('/explore-by').get(tagController.exploreBy);

router.route('/').get(tagController.getAllTags);

module.exports = router;
