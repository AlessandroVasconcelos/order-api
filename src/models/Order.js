const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define(
  'Order',
  {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'Order',
    timestamps: false,
  }
);

module.exports = Order;
