const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Product API functions
export const productAPI = {
  // Get all products with optional filtering
  getProducts: (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },

  // Get single product
  getProduct: (id) => apiRequest(`/products/${id}`),

  // Create product (admin only - for manual product addition)
  createProduct: (productData) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),

  // Update product
  updateProduct: (id, productData) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),

  // Delete product
  deleteProduct: (id) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),

  // Upload product image
  uploadImage: (productId, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    return apiRequest(`/products/${productId}/upload`, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  },
};

// Customer API functions
export const customerAPI = {
  // Register new customer
  register: (customerData) => apiRequest('/customers/register', {
    method: 'POST',
    body: JSON.stringify(customerData),
  }),

  // Login customer
  login: (credentials) => apiRequest('/customers/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  // Get customer profile
  getProfile: () => apiRequest('/customers/profile'),

  // Update customer profile
  updateProfile: (profileData) => apiRequest('/customers/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
};

// Order API functions
export const orderAPI = {
  // Get all orders for customer
  getOrders: () => apiRequest('/orders'),

  // Get single order with items
  getOrder: (id) => apiRequest(`/orders/${id}`),

  // Create new order
  createOrder: (orderData) => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),

  // Get ordered items for an order
  getOrderItems: (orderId) => apiRequest(`/orders/${orderId}/items`),
};

// Search API function
export const searchAPI = {
  // Search products
  searchProducts: (query) => apiRequest(`/products?search=${encodeURIComponent(query)}`),
};

export default {
  productAPI,
  customerAPI,
  orderAPI,
  searchAPI,
};