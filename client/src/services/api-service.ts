// src/services/api.ts
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:8080',
});

export default apiService