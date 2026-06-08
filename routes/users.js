const express = require('express');
const { User } = require('../models');
const { registerUser, loginUser } = require('../controller/user');
const router = express.Router();

// Get all users
router.post('/register',registerUser);

module.exports = router;
