const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define(
  'Items',
  {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'Items',
    timestamps: false,
  }
);

module.exports = Item;
