const express = require('express');
const parkingSlotController = require('./../controllers/parkingSlotController');

const router = express.Router();

router.route('/').get(parkingSlotController.getSlotStatus);

module.exports = router;
