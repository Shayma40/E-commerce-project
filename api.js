import axios from 'axios';

const API_BASE_URL = 'http://localhost:7800/api'; // Base URL for API
// eslint-disable-next-line no-unused-vars
const PRODUCTS_URL = `${API_BASE_URL}/products`;

// Create an Axios instance with authorization header
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
});

// Add interceptor to refresh token before each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//function to add a product
export const addProductApi = async (productData) => {
  const formData = new FormData();
  Object.keys(productData).forEach((key) => formData.append(key, productData[key]));

  try {
    const response = await apiClient.post('/products', formData);  // Use the API client here
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data; // Assuming the backend sends product data in the response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Handle the error in your components
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; 
  }
};

export default apiClient;
