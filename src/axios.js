// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',  // Remove the extra 'http//' from here
});

export default instance;
