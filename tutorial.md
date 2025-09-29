I understand! You want to add products directly through the MongoDB Atlas website interface, and you want me to modify the code to include an `id` attribute. Let me update the system for this approach.

Ran tool
First, let me update the Product model to include an `id` attribute:

Ran tool
Now let me update the ProductCard component to use the `id` attribute for image naming:

Ran tool
Ran tool
Now let me update the upload configuration to use the `id` field:

Ran tool
Now let me create comprehensive MongoDB Atlas instructions:

Ran tool
Ran tool
Now let me update the API to handle the `id` attribute properly:

Ran tool
Ran tool
Now let me update the routes to include the new endpoints:

Ran tool
Let me also update the manageProducts script to work with the new `id` field:

Ran tool
Let me read the file first to see the current structure:

Read file: server/src/scripts/manageProducts.js
Ran tool
Now let me check for any linting errors and complete the setup:

Ran tool
Ran tool
Perfect! I've successfully updated your system to work with MongoDB Atlas and added the `id` attribute. Here's what I've implemented:

## ✅ **Complete MongoDB Atlas Integration with ID Attribute**

### **🔧 Code Changes Made:**

1. **Product Model Updated**:
   - Added `id` field (String, required, unique)
   - This is your custom product identifier (e.g., "FISH001")

2. **ProductCard Component Enhanced**:
   - Now uses `product.id` for image naming
   - Automatic fallback through different image extensions (.jpg, .png, .jpeg, .gif)
   - Smart error handling for missing images

3. **API Endpoints Added**:
   - `GET /api/products/by-id/:id` - Get product by custom ID
   - `PUT /api/products/by-id/:id` - Update product by custom ID
   - Enhanced image handling for both MongoDB `_id` and custom `id`

4. **Upload Configuration Updated**:
   - Uses `product.id` for image naming
   - Supports multiple image formats

## 🌐 **MongoDB Atlas Instructions:**

### **Step 1: Access MongoDB Atlas**
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Login and select your `Cluster0`
3. Click **"Browse Collections"**
4. Select database: `bluekingdom`
5. Select collection: `products`

### **Step 2: Add Products**
Click **"INSERT DOCUMENT"** → **"JSON"** format:

```json
{
  "id": "FISH001",
  "name": "Gold Fish",
  "price": 100,
  "category": "fish",
  "stock": 10,
  "description": "Beautiful goldfish, perfect for beginners",
  "image": null,
  "inStock": true
}
```

### **Step 3: Add Images**
1. **Place image file** in `server/uploads/products/` folder
2. **Rename to match ID**: `FISH001.jpg`
3. **Image will automatically load** in frontend

## 📋 **JSON Format for MongoDB Atlas:**

### **Required Fields:**
```json
{
  "id": "FISH001",
  "name": "Product Name",
  "price": 100,
  "category": "fish",
  "stock": 10
}
```

### **Complete Format:**
```json
{
  "id": "FISH001",
  "name": "Gold Fish",
  "price": 100,
  "category": "fish",
  "stock": 10,
  "description": "Product description",
  "image": null,
  "inStock": true
}
```

### **Category Options:**
- `fish` - Fish and aquatic animals
- `medicine` - Fish medicines and treatments
- `plants` - Aquarium plants
- `accessories` - Filters, heaters, decorations
- `foods` - Fish food and supplements

## 🎯 **ID Naming Convention:**

### **Recommended Format:**
- **Fish**: `FISH001`, `FISH002`, `FISH003`...
- **Medicine**: `MED001`, `MED002`, `MED003`...
- **Plants**: `PLT001`, `PLT002`, `PLT003`...
- **Accessories**: `ACC001`, `ACC002`, `ACC003`...
- **Foods**: `FOOD001`, `FOOD002`, `FOOD003`...

## 🖼️ **Image Management:**

### **How Images Work:**
1. **Add product** to MongoDB Atlas with `id: "FISH001"`
2. **Place image** in `server/uploads/products/FISH001.jpg`
3. **Frontend automatically finds** the image using the ID
4. **Multiple formats supported**: .jpg, .png, .jpeg, .gif, .webp

### **Image URL Structure:**
- `http://localhost:5000/uploads/products/FISH001.jpg`
- Frontend tries different extensions if first one fails

## 📊 **Sample Products for MongoDB Atlas:**

### **Fish Products:**
```json
[
  {
    "id": "FISH001",
    "name": "Gold Fish",
    "price": 100,
    "category": "fish",
    "stock": 50,
    "description": "Beautiful goldfish, great for beginners"
  },
  {
    "id": "FISH002",
    "name": "Angelfish",
    "price": 250,
    "category": "fish",
    "stock": 8,
    "description": "Beautiful angelfish for medium aquariums"
  }
]
```

### **Medicine Products:**
```json
[
  {
    "id": "MED001",
    "name": "Anti-Fungal Treatment",
    "price": 150,
    "category": "medicine",
    "stock": 25,
    "description": "Effective treatment for fish fungal infections"
  }
]
```

## 🚀 **Quick Start:**

1. **Add products** via MongoDB Atlas interface
2. **Place images** in `server/uploads/products/` with matching IDs
3. **Products appear automatically** in your frontend
4. **No code changes needed** - everything is automatic!

## 📚 **Complete Documentation:**

I've created `MONGODB_ATLAS_GUIDE.md` with comprehensive instructions, examples, and troubleshooting tips.

**Your MongoDB Atlas integration is now complete!** 🐠

You can now add products directly through the MongoDB Atlas website interface, and they'll automatically appear in your frontend with proper image handling using the `id` attribute system.