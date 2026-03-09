const express = require('express');
const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/list', listOrders);
router.get('/:orderId', getOrderById);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

module.exports = router;
