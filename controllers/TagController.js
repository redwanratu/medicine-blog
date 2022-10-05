const Tag = require('../models/tagModel');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');

exports.exploreBy = catchAsync(async (req, res, next) => {
    const exploreBy = await Tag.aggregate([{ $sample: { size: 5 } }]);
  
    res.status(200).json({
      status: 'success',
      data: {
        explore: exploreBy,
      },
    });
  });
  
  exports.getAllTags = catchAsync(async (req, res, next) => {
    const tags = await Tag.find();
  
    res.status(200).json({
      status: 'success',
      data: {
        tags,
      },
    });
  });
  