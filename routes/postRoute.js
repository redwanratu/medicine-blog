const express = require('express');
const postController = require('./../controllers/postController');

const router = express.Router();

router
  .route('/')
  .post(postController.createPost)
  .get(postController.getAllPosts);

router
  .route('/home-short-info')
  .get(postController.aliasPostShortInfo, postController.getAllPosts);
router
  .route('/top-reads')
  .get(postController.aliasTopReads, postController.getAllPosts);

router.route('/:id').get(postController.readPost);
router.route('/:id/react').patch(postController.reactPost);
router.route('/:id/comment').patch(postController.commentPost);

module.exports = router;
