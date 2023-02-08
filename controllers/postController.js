const Post = require('../models/postModel');
const Tag = require('../models/tagModel');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('./../utils/apiFeatures');

exports.aliasPostShortInfo = (req, res, next) => {
  req.query.fields = 'title,author,meta,createAt,imgUrl,summary';
  req.query.limit = 20;
  next();
};

exports.aliasTopReads = (req, res, next) => {
  req.query.fields = 'imgUrl,title,meta.views';
  req.query.sort = '-meta.views';
  req.query.limit = 5;
  next();
};

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Post.find().populate('tags'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const posts = await features.query;
  const result = await features.query.countDocuments();

  res.status(201).json({
    status: 'success',
    result,
    data: {
      posts,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  console.log('post create');
  const { title, author, desc, summary, imgUrl, tags, category } = req.body;
  console.log(tags);
  const newPost = await Post.create({
    title: title,
    author: author,
    desc: desc,
    summary: summary,
    imgUrl: imgUrl,
    tags: tags,
    category:category,
  });

  res.status(200).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});

exports.readPost = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const readPost = await Post.findById(req.params.id).populate('tags');

  readPost.meta.views = readPost.meta.views + 1;
  readPost.save();

  res.status(200).json({
    status: 'success',
    data: { post: readPost },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const readPost = await Post.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { post: readPost },
  });
});

exports.reactPost = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const readPost = await Post.findById(req.params.id);

  readPost.meta.reacts = readPost.meta.reacts + 1;
  readPost.save();

  res.status(200).json({
    status: 'success',
    data: { post: readPost },
  });
});

exports.commentPost = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const { comment } = req.body;
  const readPost = await Post.findOne({ _id: req.params.id });

  console.log(comment);
  readPost.comments.push(comment);
  readPost.meta.comments = readPost.meta.comments + 1;
  readPost.save();

  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

// exports.exploreBy = catchAsync(async (req, res, next) => {
//   const exploreBy = await Tag.aggregate([{ $sample: { size: 5 } }]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       explore: exploreBy,
//     },
//   });
// });

// exports.getAllTags = catchAsync(async (req, res, next) => {
//   const tags = await Tag.find();

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tags,
//     },
//   });
// });

exports.getMetaData = catchAsync(async (req, res, next) => {});

exports.getPostShortInfo = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Post.find(), req.query);
});
