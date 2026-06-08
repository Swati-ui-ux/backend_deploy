const { sequelize, Sequelize } = require('../config/database');
const User = require('./User');
const Post = require('./Post');

// Initialize associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Post,
};
