import axios from 'axios';

// Thiết lập Base URL kết nối đến Backend
const todoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8085/api',

  headers: {
    'Content-Type': 'application/json',
  },
});

export default todoApi;
