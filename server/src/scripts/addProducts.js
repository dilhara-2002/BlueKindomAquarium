const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Sample products data
const sampleProducts = [
  {
    name: 'Arowana Fish',
    price: 5000,
    category: 'fish',
    stock: 5,
    description: 'Premium Arowana fish, perfect for large aquariums',
    image: 'arowana.png' // You can upload actual image later
  },
  {
    name: 'Gold Fish',
    price: 100,
    category: 'fish',
    stock: 50,
    description: 'Beautiful goldfish, great for beginners',
    image: 'fish.png'
  },
  {
    name: 'Blue Care Medicine',
    price: 100,
    category: 'medicine',
    stock: 20,
    description: 'Effective treatment for common fish diseases',
    image: 'blue.png'
  },
  {
    name: 'Aquarium Plants Set',
    price: 250,
    category: 'plants',
    stock: 15,
    description: 'Live aquarium plants for natural look',
    image: null
  },
  {
    name: 'Filter System',
    price: 800,
    category: 'accessories',
    stock: 10,
    description: 'High-quality water filtration system',
    image: null
  },
  {
    name: 'Fish Food Premium',
    price: 150,
    category: 'foods',
    stock: 25,
    description: 'Nutritious fish food for all types of fish',
    image: null
  }
];

async function addProducts() {
  try {
    console.log('Adding sample products...');
    
    // Clear existing products (optional - remove this if you want to keep existing data)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');
    
    // Add new products
    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
      console.log(`Added product: ${product.name}`);
    }
    
    console.log('All products added successfully!');
    console.log('\nTo add more products manually, you can:');
    console.log('1. Use the API endpoint: POST http://localhost:5000/api/products');
    console.log('2. Upload images: POST http://localhost:5000/api/products/:id/upload');
    console.log('3. Or modify this script and run it again');
    
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

// Run the script
addProducts();