// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
console.log('API_URL: ', API_URL);

const axiosInstance = axios.create({
    baseURL: API_URL,
  });

// Function to get all products
export const getProducts = () => {
    return axios.get(`${API_URL}/products`);
};

// Function to create a new product
export const createProduct = (product) => {
    return axios.post(`${API_URL}/products`, product);
};

// Function to update an existing product
export const updateProduct = (id, product) => {
    return axios.put(`${API_URL}/products/${id}`, product);
};

// Function to delete a product
export const deleteProduct = (id) => {
    return axios.delete(`${API_URL}/products/${id}`);
};