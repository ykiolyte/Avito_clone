// models/index.js
const path = require('path');
const sequelize = require('../config/database');
const User = require('./User');
const Ad = require('./Ad');
const AdImage = require('./AdImage');
const Review = require('./Review');

// Определение всех связей между моделями уже сделано в файлах моделей

module.exports = {
  sequelize,
  User,
  Ad,
  AdImage,
  Review,
};
