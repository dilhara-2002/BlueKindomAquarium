const mongoose = require('mongoose');

const orderedItemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// Ensure unique combination of order and product
orderedItemSchema.index({ orderId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('OrderedItem', orderedItemSchema);