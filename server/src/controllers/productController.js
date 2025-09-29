const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// GET /api/products - Get all products with optional filtering
const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    let filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/products/:id - Get single product by MongoDB _id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/products/by-id/:id - Get single product by custom id field
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/products - Create new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/products/:id - Update product by MongoDB _id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/products/by-id/:id - Update product by custom id field
const updateProductById = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/products/:id - Delete product by MongoDB _id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Delete associated image file if exists
    if (product.image) {
      const imagePath = path.join(__dirname, '../../uploads/products', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } else if (product.id) {
      // Try to delete image by product id
      const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      for (const ext of extensions) {
        const imagePath = path.join(__dirname, '../../uploads/products', `${product.id}${ext}`);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          break;
        }
      }
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/products/:id/upload - Upload product image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete old image if exists
    if (product.image) {
      const oldImagePath = path.join(__dirname, '../../uploads/products', product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    } else if (product.id) {
      // Try to delete old image by product id
      const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      for (const ext of extensions) {
        const imagePath = path.join(__dirname, '../../uploads/products', `${product.id}${ext}`);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          break;
        }
      }
    }

    // Update product with new image filename
    product.image = req.file.filename;
    await product.save();

    res.json({ 
      message: 'Image uploaded successfully',
      imageUrl: `/uploads/products/${req.file.filename}`,
      product: product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  updateProductById,
  deleteProduct,
  uploadImage
};