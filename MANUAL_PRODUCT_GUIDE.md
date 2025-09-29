# 🛍️ Manual Product Addition Guide - Blue Kingdom Aquarium

## 📁 Folder Structure Setup

Your project now has the following structure for manual product management:

```
BlueKindomAquarium/
├── server/
│   ├── uploads/
│   │   └── products/          # 📸 Place your product images here
│   └── src/
│       └── scripts/
│           └── manageProducts.js  # 🛠️ Product management script
```

## 🚀 Quick Start

### 1. Navigate to Server Directory
```bash
cd server
```

### 2. Add Sample Products (Optional)
```bash
node src/scripts/manageProducts.js sample
```

### 3. List All Products
```bash
node src/scripts/manageProducts.js list
```

## 📝 Adding Products Manually

### Method 1: Add Single Product
```bash
node src/scripts/manageProducts.js add '{"name":"Product Name","price":100,"category":"fish","stock":10}'
```

### Method 2: Add Multiple Products
```bash
node src/scripts/manageProducts.js add-multiple '[{"name":"Product 1","price":100,"category":"fish","stock":10},{"name":"Product 2","price":200,"category":"medicine","stock":5}]'
```

## 🖼️ Adding Product Images

### Step 1: Add Product to Database
```bash
node src/scripts/manageProducts.js add '{"name":"Beautiful Fish","price":150,"category":"fish","stock":20}'
```

### Step 2: Note the Product ID
The script will output something like:
```
✅ Product added successfully!
   ID: 507f1f77bcf86cd799439011
   Name: Beautiful Fish
   Price: Rs. 150
   Category: fish
   Stock: 20
   Image: No image
```

### Step 3: Add Image File
1. **Place your image** in `server/uploads/products/` folder
2. **Rename the image** to match the Product ID: `507f1f77bcf86cd799439011.jpg`
3. **Update the product** with image filename:
```bash
node src/scripts/manageProducts.js update-image 507f1f77bcf86cd799439011 507f1f77bcf86cd799439011.jpg
```

## 📋 JSON Format for Products

### Required Fields:
```json
{
  "name": "Product Name",
  "price": 100,
  "category": "fish",
  "stock": 10
}
```

### Complete Format (with optional fields):
```json
{
  "name": "Product Name",
  "price": 100,
  "category": "fish|medicine|plants|accessories|foods",
  "stock": 10,
  "image": null
}
```

### Category Options:
- `fish` - Fish and aquatic animals
- `medicine` - Fish medicines and treatments
- `plants` - Aquarium plants
- `accessories` - Filters, heaters, decorations
- `foods` - Fish food and supplements

## 🛠️ Available Commands

### Add Products
```bash
# Add single product
node src/scripts/manageProducts.js add '{"name":"Gold Fish","price":50,"category":"fish","stock":25}'

# Add multiple products
node src/scripts/manageProducts.js add-multiple '[{"name":"Fish Food","price":75,"category":"foods","stock":30},{"name":"Water Filter","price":200,"category":"accessories","stock":5}]'
```

### List Products
```bash
# List all products
node src/scripts/manageProducts.js list
```

### Update Product Image
```bash
# Update product image
node src/scripts/manageProducts.js update-image <productId> <imageFilename>
```

### Delete Product
```bash
# Delete product (also deletes associated image)
node src/scripts/manageProducts.js delete <productId>
```

### Add Sample Products
```bash
# Add sample products for testing
node src/scripts/manageProducts.js sample
```

## 📸 Image Management

### Supported Image Formats:
- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`

### Image Naming Convention:
- **Use Product ID as filename**: `507f1f77bcf86cd799439011.jpg`
- **Include file extension**: `.jpg`, `.png`, etc.
- **Place in correct folder**: `server/uploads/products/`

### Example Workflow:
1. **Add product**: `node src/scripts/manageProducts.js add '{"name":"Tropical Fish","price":300,"category":"fish","stock":15}'`
2. **Get Product ID**: `507f1f77bcf86cd799439011`
3. **Add image file**: `507f1f77bcf86cd799439011.jpg` in `server/uploads/products/`
4. **Update product**: `node src/scripts/manageProducts.js update-image 507f1f77bcf86cd799439011 507f1f77bcf86cd799439011.jpg`

## 🔍 Product Management Examples

### Example 1: Add Fish Products
```bash
node src/scripts/manageProducts.js add-multiple '[
  {"name":"Angelfish","price":250,"category":"fish","stock":8},
  {"name":"Betta Fish","price":75,"category":"fish","stock":20},
  {"name":"Guppy","price":30,"category":"fish","stock":50}
]'
```

### Example 2: Add Accessories
```bash
node src/scripts/manageProducts.js add-multiple '[
  {"name":"Aquarium Heater","price":1200,"category":"accessories","stock":5},
  {"name":"Air Pump","price":800,"category":"accessories","stock":10},
  {"name":"LED Light","price":1500,"category":"accessories","stock":3}
]'
```

### Example 3: Add Medicines
```bash
node src/scripts/manageProducts.js add-multiple '[
  {"name":"Anti-Fungal Treatment","price":150,"category":"medicine","stock":25},
  {"name":"Water Conditioner","price":200,"category":"medicine","stock":30},
  {"name":"Bacterial Treatment","price":180,"category":"medicine","stock":20}
]'
```

## 🎯 Best Practices

### 1. Product Naming
- Use descriptive names: "Gold Fish" instead of "Fish"
- Include size/variety: "Large Angelfish", "Small Guppy"
- Be consistent with naming conventions

### 2. Pricing
- Use realistic prices in your local currency
- Consider market rates for similar products
- Include decimal places if needed: `150.50`

### 3. Stock Management
- Set realistic stock levels
- Update stock when products are sold
- Use `0` for out-of-stock items

### 4. Images
- Use high-quality images (recommended: 400x400px minimum)
- Ensure good lighting and clear product visibility
- Use consistent image backgrounds/angles

### 5. Product Management
- Keep product names descriptive and clear
- Use consistent naming conventions
- Update stock levels regularly

## 🚨 Troubleshooting

### Common Issues:

1. **JSON Parse Error**
   - Check quotes: Use single quotes around JSON, double quotes inside
   - Validate JSON format online if needed

2. **Image Not Showing**
   - Verify image file exists in `server/uploads/products/`
   - Check filename matches Product ID exactly
   - Ensure image format is supported

3. **Database Connection Error**
   - Make sure MongoDB is running
   - Check `.env` file has correct MongoDB URI
   - Verify network connection

4. **Product Not Found**
   - Use correct Product ID (copy from list command)
   - Check if product was actually created

### Getting Help:
```bash
# Show help and examples
node src/scripts/manageProducts.js
```

## 📊 Monitoring Products

### Check Product Status:
```bash
# List all products with details
node src/scripts/manageProducts.js list
```

### Verify Images:
1. Check `server/uploads/products/` folder
2. Visit `http://localhost:5000/uploads/products/[filename]` in browser
3. Ensure images load correctly in frontend

---

**Happy Product Management! 🐠🐟🐡**