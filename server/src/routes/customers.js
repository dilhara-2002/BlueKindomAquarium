const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile
} = require('../controllers/customerController');
const { authenticateToken } = require('../config/auth');

// POST /api/customers/register - Register new customer
router.post('/register', register);

// POST /api/customers/login - Login customer
router.post('/login', login);

// GET /api/customers/profile - Get customer profile (protected route)
router.get('/profile', authenticateToken, getProfile);

// PUT /api/customers/profile - Update customer profile (protected route)
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;