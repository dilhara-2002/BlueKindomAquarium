# Blue Kingdom Aquarium - Full Stack Setup Instructions

## 🚀 Project Overview

This is a full-stack e-commerce application for an aquarium store with the following features:
- **Frontend**: React.js with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT-based
- **File Upload**: Multer for product images

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

## 🛠️ Setup Instructions

### 1. Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Copy the example file
   cp env.example .env
   
   # Edit .env file with your MongoDB URI
   # MONGODB_URI=mongodb+srv://dilharakariyawasam2002_db_user:sPSqKNqwbQS6z6ud@cluster0.zxk2rmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   # JWT_SECRET=your-super-secret-jwt-key-here
   # PORT=5000
   ```

4. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Or production mode
   npm start
   ```

   The server will run on `http://localhost:5000`

### 2. Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

### 3. Database Setup

1. **Add sample products to MongoDB:**
   ```bash
   # From the server directory
   node src/scripts/addProducts.js
   ```

2. **Verify the setup:**
   - Visit `http://localhost:5000/api/health` to check if the backend is running
   - Visit `http://localhost:5173` to see the frontend

## 📊 Database Schema

Based on your ER diagram, the database includes:

### Products Collection
- `_id`: Unique identifier
- `name`: Product name
- `price`: Product price
- `category`: fish, medicine, plants, accessories, foods
- `stock`: Available quantity
- `image`: Image filename (stored in uploads folder)
- `description`: Product description
- `inStock`: Boolean (auto-calculated from stock)

### Customers Collection
- `_id`: Unique identifier
- `name`: Customer name
- `email`: Customer email (unique)
- `password`: Hashed password

### Orders Collection
- `_id`: Unique identifier
- `customerId`: Reference to Customer
- `status`: pending, processing, shipped, delivered, cancelled
- `total`: Order total amount
- `orderedDate`: Order date
- `shippingAddress`: Customer address
- `paymentMethod`: Payment method used

### OrderedItems Collection
- `_id`: Unique identifier
- `orderId`: Reference to Order
- `productId`: Reference to Product
- `quantity`: Number of items ordered
- `price`: Price at time of order

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `POST /api/products/:id/upload` - Upload product image

### Customers
- `POST /api/customers/register` - Register new customer
- `POST /api/customers/login` - Login customer
- `GET /api/customers/profile` - Get customer profile (protected)
- `PUT /api/customers/profile` - Update customer profile (protected)

### Orders
- `GET /api/orders` - Get customer orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/:id/items` - Get order items (protected)

## 📁 File Structure

```
BlueKindomAquarium/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── context/       # React context
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   │   ├── database.js    # MongoDB connection
│   │   │   ├── auth.js        # JWT authentication
│   │   │   └── upload.js      # File upload config
│   │   ├── controllers/   # Route controllers
│   │   │   ├── productController.js
│   │   │   ├── customerController.js
│   │   │   └── orderController.js
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── scripts/       # Utility scripts
│   │   └── server.js      # Main server file
│   ├── uploads/           # Product images (created automatically)
│   └── package.json
└── README.md
```

## 🖼️ Adding Product Images

### Method 1: Using API (Recommended)
```bash
# Upload image for a specific product
curl -X POST \
  http://localhost:5000/api/products/PRODUCT_ID/upload \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@/path/to/your/image.jpg'
```

### Method 2: Manual Upload
1. Place images in `server/uploads/products/` folder
2. Rename image to match product ID (e.g., `PRODUCT_ID.jpg`)
3. Update product in MongoDB with image filename

### Method 3: Using Admin Panel (Future Enhancement)
- Create an admin interface for managing products and images

## 🛒 Adding Products to MongoDB

### Method 1: Using the Script
```bash
# Run the sample products script
node src/scripts/addProducts.js
```

### Method 2: Using API
```bash
curl -X POST http://localhost:5000/api/products \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "New Product",
    "price": 100,
    "category": "fish",
    "stock": 10,
    "description": "Product description"
  }'
```

### Method 3: Direct MongoDB
```javascript
// Connect to MongoDB and insert
db.products.insertOne({
  name: "Product Name",
  price: 100,
  category: "fish",
  stock: 10,
  description: "Description"
});
```

## 🔐 Authentication

- Users can register and login
- JWT tokens are stored in localStorage
- Protected routes require valid tokens
- Passwords are hashed using bcrypt

## 🚀 Running the Project

1. **Start Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file

2. **CORS Issues:**
   - Backend has CORS enabled for localhost:5173

3. **Image Upload Issues:**
   - Check uploads folder permissions
   - Ensure file size is under 5MB

4. **Authentication Issues:**
   - Clear localStorage and try again
   - Check JWT_SECRET in .env

## 📝 Next Steps

1. Add product management admin panel
2. Implement shopping cart functionality
3. Add order management system
4. Implement payment integration
5. Add email notifications
6. Add product reviews and ratings

## 🤝 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check network connectivity between frontend and backend

---

**Happy Coding! 🐠🐟🐡**