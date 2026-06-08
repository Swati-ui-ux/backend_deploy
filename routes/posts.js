const express = require('express');
const { Post, User } = require('../models');

const router = express.Router();

// Get all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
});

// Get post by ID
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
    });
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

// Create post
router.post('/', async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    
    // Validation
    if (!title || !content || !userId) {
      return res.status(400).json({ 
        success: false, 
        error: 'title, content, and userId are required' 
      });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const post = await Post.create({ title, content, userId });
    res.status(201).json({ 
      success: true, 
      message: 'Post created successfully',
      data: post 
    });
  } catch (error) {
    next(error);
  }
});

// Update post
router.put('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    await post.update(req.body);
    res.json({ 
      success: true, 
      message: 'Post updated successfully',
      data: post 
    });
  } catch (error) {
    next(error);
  }
});

// Delete post
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    await post.destroy();
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
