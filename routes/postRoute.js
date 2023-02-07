const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(postController.createPost)
  .get(
    //authController.protect,
    //authController.restrictTo('user', 'admin', 'author', 'reader'),
    postController.getAllPosts
  );

router
  .route('/home-short-info')
  .get(postController.aliasPostShortInfo, postController.getAllPosts);

router
  .route('/top-reads')
  .get(postController.aliasTopReads, postController.getAllPosts);

router.route('/:id').get(postController.readPost);
router.route('/:id/react').patch(postController.reactPost);
router.route('/:id/comment').patch(postController.commentPost);

router.route('/post/:id').get(postController.getPost);

module.exports = router;
