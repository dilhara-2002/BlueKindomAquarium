# 🗄️ MongoDB Atlas Product Management Guide - Blue Kingdom Aquarium

## 🌐 Accessing MongoDB Atlas

### 1. Login to MongoDB Atlas
- Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
- Login with your credentials
- Select your cluster: `Cluster0`

### 2. Access Database
- Click **"Browse Collections"** or **"Collections"**
- Select database: `bluekingdom` (or your database name)
- Select collection: `products`

## 📝 Adding Products via MongoDB Atlas Interface

### Step 1: Navigate to Products Collection
1. In MongoDB Atlas, go to **Collections**
2. Select your database: `bluekingdom`
3. Click on the `products` collection

### Step 2: Add New Document
1. Click **"INSERT DOCUMENT"** button
2. Choose **"JSON"** format
3. Use the JSON format below

## 📋 JSON Format for Products

### Required Fields:
```json
{
  "id": "FISH001",
  "name": "Gold Fish",
  "price": 100,
  "category": "fish",
  "stock": 10
}
```

### Complete Format (with all fields):
```json
{
  "id": "FISH001",
  "name": "Gold Fish",
  "price": 100,
  "category": "fish",
  "stock": 10,
  "image": null,
  "inStock": true
}
```

### Field Descriptions:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | String | ✅ Yes | Unique product identifier | "FISH001" |
| `name` | String | ✅ Yes | Product name | "Gold Fish" |
| `price` | Number | ✅ Yes | Product price | 100 |
| `category` | String | ✅ Yes | Product category | "fish" |
| `stock` | Number | ✅ Yes | Available quantity | 10 |
| `image` | String | ❌ No | Image filename | "FISH001.jpg" |
| `inStock` | Boolean | ❌ No | Stock status | true |

### Category Options:
- `fish` - Fish and aquatic animals
- `medicine` - Fish medicines and treatments
- `plants` - Aquarium plants
- `accessories` - Filters, heaters, decorations
- `foods` - Fish food and supplements

## 🎯 Product ID Naming Convention

### Recommended ID Format:
- **Fish**: `FISH001`, `FISH002`, `FISH003`...
- **Medicine**: `MED001`, `MED002`, `MED003`...
- **Plants**: `PLT001`, `PLT002`, `PLT003`...
- **Accessories**: `ACC001`, `ACC002`, `ACC003`...
- **Foods**: `FOOD001`, `FOOD002`, `FOOD003`...

### Examples:
```json
{
  "id": "FISH001",
  "name": "Angelfish",
  "price": 250,
  "category": "fish",
  "stock": 8,
  "description": "Beautiful angelfish for medium aquariums"
}
```

```json
{
  "id": "MED001",
  "name": "Anti-Fungal Treatment",
  "price": 150,
  "category": "medicine",
  "stock": 25,
  "description": "Effective treatment for fish fungal infections"
}
```

## 🖼️ Adding Product Images

### Step 1: Add Product to Database
Add your product using the JSON format above via MongoDB Atlas interface.

### Step 2: Add Image File
1. **Navigate to your project folder**: `server/uploads/products/`
2. **Add your image file** with the same name as the product `id`
3. **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### Example:
- **Product ID**: `FISH001`
- **Image file**: `FISH001.jpg` (place in `server/uploads/products/`)
- **Image URL**: `http://localhost:5000/uploads/products/FISH001.jpg`

### Step 3: Update Product with Image (Optional)
You can update the product document to include the image filename:

```json
{
  "id": "FISH001",
  "name": "Gold Fish",
  "price": 100,
  "category": "fish",
  "stock": 10,
  "description": "Beautiful goldfish",
  "image": "FISH001.jpg",
  "inStock": true
}
```

## 📊 Sample Products for Testing

### Fish Products:
```json
[
  {
    "id": "FISH001",
    "name": "Gold Fish",
    "price": 100,
    "category": "fish",
    "stock": 50
  },
  {
    "id": "FISH002",
    "name": "Angelfish",
    "price": 250,
    "category": "fish",
    "stock": 8
  },
  {
    "id": "FISH003",
    "name": "Betta Fish",
    "price": 75,
    "category": "fish",
    "stock": 20
  }
]
```

### Medicine Products:
```json
[
  {
    "id": "MED001",
    "name": "Anti-Fungal Treatment",
    "price": 150,
    "category": "medicine",
    "stock": 25
  },
  {
    "id": "MED002",
    "name": "Water Conditioner",
    "price": 200,
    "category": "medicine",
    "stock": 30
  }
]
```

### Accessories:
```json
[
  {
    "id": "ACC001",
    "name": "Aquarium Heater",
    "price": 1200,
    "category": "accessories",
    "stock": 5
  },
  {
    "id": "ACC002",
    "name": "Air Pump",
    "price": 800,
    "category": "accessories",
    "stock": 10
  }
]
```

### Plants:
```json
[
  {
    "id": "PLT001",
    "name": "Java Fern",
    "price": 80,
    "category": "plants",
    "stock": 15
  },
  {
    "id": "PLT002",
    "name": "Anubias",
    "price": 120,
    "category": "plants",
    "stock": 12
  }
]
```

### Foods:
```json
[
  {
    "id": "FOOD001",
    "name": "Fish Food Flakes",
    "price": 75,
    "category": "foods",
    "stock": 30
  },
  {
    "id": "FOOD002",
    "name": "Bloodworms",
    "price": 150,
    "category": "foods",
    "stock": 20
  }
]
```

## 🔧 MongoDB Atlas Operations

### Adding a Single Product:
1. Click **"INSERT DOCUMENT"**
2. Select **"JSON"** format
3. Paste the JSON for your product
4. Click **"INSERT"**

### Adding Multiple Products:
1. Click **"INSERT DOCUMENT"**
2. Select **"JSON"** format
3. Paste an array of products: `[{...}, {...}, {...}]`
4. Click **"INSERT"**

### Editing a Product:
1. Find the product in the collection
2. Click the **"Edit"** button (pencil icon)
3. Modify the fields
4. Click **"UPDATE"**

### Deleting a Product:
1. Find the product in the collection
2. Click the **"Delete"** button (trash icon)
3. Confirm deletion

## 🎯 Best Practices

### 1. ID Management:
- Use descriptive, unique IDs
- Follow consistent naming patterns
- Avoid special characters in IDs

### 2. Data Validation:
- Always include required fields
- Use correct data types
- Validate category values

### 3. Image Management:
- Use same filename as product ID
- Place images in correct folder
- Use supported image formats

### 4. Stock Management:
- Update stock levels regularly
- Set realistic stock quantities
- Use `inStock` field for quick reference

## 🚨 Important Notes

### Database Connection:
- Your MongoDB Atlas connection string is already configured
- Database name: `bluekingdom`
- Collection name: `products`

### Image Handling:
- Images are served from: `http://localhost:5000/uploads/products/`
- Frontend automatically looks for images using product ID
- Fallback to default image if not found

### Field Requirements:
- `id` must be unique across all products
- `category` must be one of the allowed values
- `price` and `stock` must be numbers ≥ 0

## 🔍 Troubleshooting

### Common Issues:

1. **Duplicate ID Error**:
   - Ensure each product has a unique `id`
   - Check existing products for ID conflicts

2. **Category Validation Error**:
   - Use only: `fish`, `medicine`, `plants`, `accessories`, `foods`
   - Check spelling and case sensitivity

3. **Image Not Showing**:
   - Verify image file exists in `server/uploads/products/`
   - Check filename matches product ID exactly
   - Ensure image format is supported

4. **Connection Issues**:
   - Verify MongoDB Atlas cluster is running
   - Check network connectivity
   - Ensure correct database and collection names

---

**Happy Product Management! 🐠🐟🐡**

Your products will automatically appear in the frontend once added to MongoDB Atlas!