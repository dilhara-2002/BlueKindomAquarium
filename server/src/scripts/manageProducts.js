const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Function to add a single product manually
async function addProduct(productData) {
  try {
    console.log('Adding product:', productData.name);
    
    // Create new product
    const product = new Product(productData);
    await product.save();
    
    console.log(`✅ Product added successfully!`);
    console.log(`   ID: ${product._id}`);
    console.log(`   Name: ${product.name}`);
    console.log(`   Price: Rs. ${product.price}`);
    console.log(`   Category: ${product.category}`);
    console.log(`   Stock: ${product.stock}`);
    console.log(`   Image: ${product.image || 'No image'}`);
    console.log('');
    
    return product;
  } catch (error) {
    console.error('❌ Error adding product:', error.message);
    throw error;
  }
}

// Function to add multiple products
async function addMultipleProducts(productsArray) {
  try {
    console.log(`Adding ${productsArray.length} products...`);
    console.log('='.repeat(50));
    
    for (const productData of productsArray) {
      await addProduct(productData);
    }
    
    console.log('='.repeat(50));
    console.log('✅ All products added successfully!');
    
  } catch (error) {
    console.error('❌ Error adding products:', error.message);
  }
}

// Function to list all products
async function listProducts() {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    console.log(`\n📋 Total Products: ${products.length}`);
    console.log('='.repeat(80));
    console.log('ID'.padEnd(25) + 'Name'.padEnd(20) + 'Price'.padEnd(10) + 'Category'.padEnd(12) + 'Stock'.padEnd(8) + 'Image');
    console.log('='.repeat(80));
    
    products.forEach(product => {
      const id = product._id.toString().substring(0, 8) + '...';
      const name = product.name.substring(0, 18) + (product.name.length > 18 ? '...' : '');
      const price = `Rs.${product.price}`;
      const category = product.category.substring(0, 10);
      const stock = product.stock.toString();
      const image = product.image || 'None';
      
      console.log(
        id.padEnd(25) + 
        name.padEnd(20) + 
        price.padEnd(10) + 
        category.padEnd(12) + 
        stock.padEnd(8) + 
        image
      );
    });
    
    console.log('='.repeat(80));
    
  } catch (error) {
    console.error('❌ Error listing products:', error.message);
  }
}

// Function to update product image
async function updateProductImage(productId, imageFilename) {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.error('❌ Product not found with ID:', productId);
      return;
    }
    
    // Check if image file exists
    const imagePath = path.join(__dirname, '../uploads/products', imageFilename);
    if (!fs.existsSync(imagePath)) {
      console.error('❌ Image file not found:', imagePath);
      return;
    }
    
    // Update product with image filename
    product.image = imageFilename;
    await product.save();
    
    console.log(`✅ Product image updated successfully!`);
    console.log(`   Product: ${product.name}`);
    console.log(`   Image: ${imageFilename}`);
    
  } catch (error) {
    console.error('❌ Error updating product image:', error.message);
  }
}

// Function to delete a product
async function deleteProduct(productId) {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      console.error('❌ Product not found with ID:', productId);
      return;
    }
    
    // Delete associated image file if exists
    if (product.image) {
      const imagePath = path.join(__dirname, '../uploads/products', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`🗑️ Deleted image file: ${product.image}`);
      }
    }
    
    console.log(`✅ Product deleted successfully!`);
    console.log(`   Deleted: ${product.name}`);
    
  } catch (error) {
    console.error('❌ Error deleting product:', error.message);
  }
}

// Main function to handle command line arguments
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    switch (command) {
      case 'add':
        if (args.length < 2) {
          console.log('Usage: node addProducts.js add \'{"name":"Product Name","price":100,"category":"fish","stock":10,"description":"Description"}\'');
          break;
        }
        const productData = JSON.parse(args[1]);
        await addProduct(productData);
        break;
        
      case 'add-multiple':
        if (args.length < 2) {
          console.log('Usage: node addProducts.js add-multiple \'[{"name":"Product 1","price":100,"category":"fish","stock":10},{"name":"Product 2","price":200,"category":"medicine","stock":5}]\'');
          break;
        }
        const productsArray = JSON.parse(args[1]);
        await addMultipleProducts(productsArray);
        break;
        
      case 'list':
        await listProducts();
        break;
        
      case 'update-image':
        if (args.length < 3) {
          console.log('Usage: node addProducts.js update-image <productId> <imageFilename>');
          break;
        }
        await updateProductImage(args[1], args[2]);
        break;
        
      case 'delete':
        if (args.length < 2) {
          console.log('Usage: node addProducts.js delete <productId>');
          break;
        }
        await deleteProduct(args[1]);
        break;
        
      case 'sample':
        // Add sample products
        const sampleProducts = [
          {
            id: 'FISH001',
            name: 'Arowana Fish',
            price: 5000,
            category: 'fish',
            stock: 5,
            image: null
          },
          {
            id: 'FISH002',
            name: 'Gold Fish',
            price: 100,
            category: 'fish',
            stock: 50,
            image: null
          },
          {
            id: 'MED001',
            name: 'Blue Care Medicine',
            price: 100,
            category: 'medicine',
            stock: 20,
            image: null
          },
          {
            id: 'PLT001',
            name: 'Aquarium Plants Set',
            price: 250,
            category: 'plants',
            stock: 15,
            image: null
          },
          {
            id: 'ACC001',
            name: 'Filter System',
            price: 800,
            category: 'accessories',
            stock: 10,
            image: null
          },
          {
            id: 'FOOD001',
            name: 'Fish Food Premium',
            price: 150,
            category: 'foods',
            stock: 25,
            image: null
          }
        ];
        await addMultipleProducts(sampleProducts);
        break;
        
      default:
        console.log(`
🛍️ Blue Kingdom Aquarium - Product Management Script

Usage:
  node addProducts.js <command> [arguments]

Commands:
  add <json>              Add a single product
  add-multiple <json>     Add multiple products
  list                    List all products
  update-image <id> <file> Update product image
  delete <id>             Delete a product
  sample                  Add sample products

Examples:
  node addProducts.js add '{"name":"New Fish","price":200,"category":"fish","stock":10,"description":"A beautiful fish"}'
  node addProducts.js list
  node addProducts.js update-image 507f1f77bcf86cd799439011 fish1.jpg
  node addProducts.js delete 507f1f77bcf86cd799439011
  node addProducts.js sample

JSON Format for Products:
{
  "name": "Product Name",
  "price": 100,
  "category": "fish|medicine|plants|accessories|foods",
  "stock": 10,
  "description": "Product description",
  "image": null
}
        `);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

// Run the script
main();