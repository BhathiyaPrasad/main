// src/lib/axios.ts
import axios from "axios";

// Create a central axios instance with default settings
const apiClient = axios.create({
  baseURL: "http://localhost:8000/v1", // Set your API base URL
  timeout: 10000, // Optional timeout (in ms)
  withCredentials: true,
});

// // Add a request interceptor to attach the authorization token
// apiClient.interceptors.request.use(
//   (config) => {
//     // You can get the token from local storage, context, or cookies
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Optionally, you can add a response interceptor to handle errors globally
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle token expiration, unauthorized access, etc.
//     if (error.response?.status === 401) {
//       // Redirect to login or refresh token logic
//       console.error('Unauthorized! Redirecting to login...');
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
