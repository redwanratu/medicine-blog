const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tag: String,
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;