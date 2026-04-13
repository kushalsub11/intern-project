/* global module */
const express = require('express');
const router  = express.Router();
const Post = require('../models/Post');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');


// GET /posts
router.get('/', asyncHandler(async(req, res) => {
  const filter = {};
  if (req.query.author) {
    filter.author = req.query.author;
  }
  const posts = await Post.find(filter);
  res.json({ success: true, data: posts });

}));
  
// GET /posts/:id
router.get('/:id', asyncHandler(async(req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
      return next(new AppError('Post not found', 404));
    }
    res.json({ success: true, data: post });
}));

// POST /posts
router.post('/', asyncHandler(async(req, res, next) => {
  const { title, content, author, tags } = req.body;
  if (!title || !content || !author) {
    return next(new AppError('Missing required fields: title, content, author', 400));
  }
  const post = new Post({ title, content, author, tags: tags || [] });
  await post.save();
  res.status(201).json({ success: true, data: post });  
}));

// PUT /posts/:id
router.put('/:id', asyncHandler(async(req, res, next ) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError('Post not found', 404));
  }
  const { title, content, author, tags } = req.body;
  if (!title || !content || !author) {
    return next(new AppError('Missing required fields: title, content, author', 400));
  }
  post.title = title;
  post.content = content;
  post.author = author;
  post.tags = tags || [];
  post.updatedAt = new Date().toISOString();
  await post.save();
  res.json({ success: true, data: post });

}));

// DELETE /posts/:id
router.delete('/:id', asyncHandler(async(req, res, next) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return next(new AppError('Post not found', 404));
    }
    res.json({ success: true, data: post });

} 
));


module.exports = router;
