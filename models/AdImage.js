// models/AdImage.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ad = require('./Ad');

class AdImage extends Model {}

AdImage.init(
  {
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'AdImage',
  }
);

// Связь с объявлением
AdImage.belongsTo(Ad, { foreignKey: 'adId', as: 'ad' });
Ad.hasMany(AdImage, { foreignKey: 'adId', as: 'images' });

module.exports = AdImage;
