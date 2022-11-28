const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('./../utils/apiFeatures');

exports.getSlotStatus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      slot_1: 1,
      slot_2: 2,
      slot_3: 1,
    },
  });
});
