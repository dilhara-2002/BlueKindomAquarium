const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getOrderItems
} = require('../controllers/orderController');
const { authenticateToken } = require('../config/auth');

// GET /api/orders - Get all orders for authenticated customer
router.get('/', authenticateToken, getOrders);

// GET /api/orders/:id - Get single order with items
router.get('/:id', authenticateToken, getOrder);

// POST /api/orders - Create new order
router.post('/', authenticateToken, createOrder);

// PUT /api/orders/:id/status - Update order status (admin only - simplified for now)
router.put('/:id/status', updateOrderStatus);

// GET /api/orders/:id/items - Get ordered items for an order
router.get('/:id/items', authenticateToken, getOrderItems);

module.exports = router;