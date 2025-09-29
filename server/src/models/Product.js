const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['fish', 'medicine', 'plants', 'accessories', 'foods']
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  image: {
    type: String,
    default: null // Will store the filename (id + extension)
  },
  inStock: {
    type: Boolean,
    default: function() {
      return this.stock > 0;
    }
  }
}, {
  timestamps: true
});

// Update inStock when stock changes
productSchema.pre('save', function(next) {
  this.inStock = this.stock > 0;
  next();
});

module.exports = mongoose.model('Product', productSchema);