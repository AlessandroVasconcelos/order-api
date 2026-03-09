const Order = require('./Order');
const Item = require('./Item');

Order.hasMany(Item, {
  foreignKey: 'orderId',
  sourceKey: 'orderId',
  as: 'items',
});

Item.belongsTo(Order, {
  foreignKey: 'orderId',
  targetKey: 'orderId',
});

module.exports = { Order, Item };
