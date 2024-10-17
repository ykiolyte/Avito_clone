// models/Review.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Ad = require('./Ad');

class Review extends Model {}

Review.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    text: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Review',
  }
);

// Связи
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Review.belongsTo(Ad, { foreignKey: 'adId', as: 'ad' });
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Ad.hasMany(Review, { foreignKey: 'adId', as: 'reviews' });

module.exports = Review;
