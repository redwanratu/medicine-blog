const mongoose = require('mongoose');
const Tag = require('./../models/tagModel');
//const autoIncrement = require('mongoose-auto-increament');

const postSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Required  field Title Missing'] },

  author: { type: String, required: [true, 'Author Missing'] },
  desc: { type: String, required: [true, 'Description Missing'] },
  summary: { type: String },
  //tags: [{ type: String, default: '' }],
  //content: { type: String, required: true },
  imgUrl: { type: String },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }],
  //category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
  react_users: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String, required: true, default: '' },
      //type: { type: Number, default: 1 },
      //introduce: { type: String, default: '' },
      //avatar: { type: String, default: 'user' },
      createAt: { type: Date, default: Date.now },
    },
  ],
  category: {type: String, default: 'General'},
  comments: [{ type: String }],
  meta: {
    views: { type: Number, default: 0 },
    reacts: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

// left for future testing

// postSchema.plugin(autoIncrement.plugin, {
//   model: 'post',
//   field: 'id',
//   startAt: 1,
//   incrementBy: 1,
// });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
