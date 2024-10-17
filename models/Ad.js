// models/Ad.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

class Ad extends Model {}

Ad.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: 'Ad',
  }
);

// Связь с пользователем
Ad.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Ad, { foreignKey: 'userId', as: 'ads' });

module.exports = Ad;
