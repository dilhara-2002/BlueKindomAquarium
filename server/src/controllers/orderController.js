const Order = require('../models/Order');
const OrderedItem = require('../models/OrderedItem');
const Product = require('../models/Product');

// GET /api/orders - Get all orders for authenticated customer
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.customerId })
      .populate('customerId', 'name email')
      .sort({ orderedDate: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/orders/:id - Get single order with items
const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      customerId: req.customerId 
    }).populate('customerId', 'name email');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Get ordered items with product details
    const orderedItems = await OrderedItem.find({ orderId: order._id })
      .populate('productId', 'name image price');

    res.json({
      order,
      items: orderedItems
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/orders - Create new order
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    // Calculate total and validate products
    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product with ID ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for product ${product.name}. Available: ${product.stock}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      validatedItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Create order
    const order = new Order({
      customerId: req.customerId,
      total,
      shippingAddress,
      paymentMethod
    });

    await order.save();

    // Create ordered items and update product stock
    for (const item of validatedItems) {
      const orderedItem = new OrderedItem({
        orderId: order._id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      });

      await orderedItem.save();

      // Update product stock
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Populate order with customer details
    await order.populate('customerId', 'name email');

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/orders/:id/status - Update order status (admin only - simplified for now)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('customerId', 'name email');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/orders/:id/items - Get ordered items for an order
const getOrderItems = async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      customerId: req.customerId 
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderedItems = await OrderedItem.find({ orderId: order._id })
      .populate('productId', 'name image price category');

    res.json(orderedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getOrderItems
};