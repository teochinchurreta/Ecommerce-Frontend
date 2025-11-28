import axios from 'axios';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const instance = axios.create({ baseURL: API, headers: { 'Content-Type': 'application/json' } });

instance.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if(token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

instance.interceptors.response.use(res => res, err => {
  const msg = err.response?.data?.message || err.message || 'Error desconocido';
  return Promise.reject(new Error(msg));
});

export default instance;

// Helpers
export const authService = {
  register: (payload) => instance.post('/auth/register', payload).then(r=>r.data),
  login: (payload) => instance.post('/auth/login', payload).then(r=>r.data)
};

export const productService = {
  list: (page=1, limit=10) => instance.get(`/products?page=${page}&limit=${limit}`).then(r=>r.data),
  get: (id) => instance.get(`/products/${id}`).then(r=>r.data),
  create: (body) => instance.post('/products', body).then(r=>r.data),
  update: (id, body) => instance.put(`/products/${id}`, body).then(r=>r.data),
  remove: (id) => instance.delete(`/products/${id}`).then(r=>r.data),
};

export const purchaseService = {
  list: (page=1, limit=10) => instance.get(`/purchases?page=${page}&limit=${limit}`).then(r=>r.data),
  get: (id) => instance.get(`/purchases/${id}`).then(r=>r.data),
  create: (body) => instance.post('/purchases', body).then(r=>r.data),
  update: (id, body) => instance.put(`/purchases/${id}`, body).then(r=>r.data),
  remove: (id) => instance.delete(`/purchases/${id}`).then(r=>r.data),
};
