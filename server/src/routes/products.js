const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  updateProductById,
  deleteProduct,
  uploadImage
} = require('../controllers/productController');
const upload = require('../config/upload');

// GET /api/products - Get all products with optional filtering
router.get('/', getProducts);

// GET /api/products/by-id/:id - Get single product by custom id field
router.get('/by-id/:id', getProductById);

// GET /api/products/:id - Get single product by MongoDB _id
router.get('/:id', getProduct);

// POST /api/products - Create new product
router.post('/', createProduct);

// PUT /api/products/by-id/:id - Update product by custom id field
router.put('/by-id/:id', updateProductById);

// PUT /api/products/:id - Update product by MongoDB _id
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete product by MongoDB _id
router.delete('/:id', deleteProduct);

// POST /api/products/:id/upload - Upload product image
router.post('/:id/upload', upload.single('image'), uploadImage);

module.exports = router;