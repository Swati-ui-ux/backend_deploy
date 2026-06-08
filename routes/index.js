const express = require('express');
const userRoutes = require('./users');
const postRoutes = require('./posts');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

// Root API endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'API v1 - Backend Server with MySQL',
    endpoints: {
      users: '/api/v1/users',
      posts: '/api/v1/posts',
    },
  });
});

module.exports = router;
