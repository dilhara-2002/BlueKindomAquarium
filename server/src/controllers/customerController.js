const Customer = require('../models/Customer');
const { generateToken } = require('../config/auth');

// POST /api/customers/register - Register new customer
const register = async (req, res) => {
  try {
    const { name, email, password, shippingAddress } = req.body;

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer already exists with this email' });
    }

    // Create new customer
    const customer = new Customer({ name, email, password, shippingAddress });
    await customer.save();

    // Generate JWT token
    const token = generateToken({ customerId: customer._id });

    res.status(201).json({
      message: 'Customer registered successfully',
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        shippingAddress: customer.shippingAddress
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /api/customers/login - Login customer
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await customer.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken({ customerId: customer._id });

    res.json({
      message: 'Login successful',
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        shippingAddress: customer.shippingAddress
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/customers/profile - Get customer profile (protected route)
const getProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select('-password');
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/customers/profile - Update customer profile (protected route)
const updateProfile = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.customerId,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};