import axios from 'axios';
import * as auth from './auth';

const create = (baseURL = process.env.REACT_APP_API_URL) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  api.interceptors.request.use(
    config => {
      const token = auth.getToken();
      if (token) {
        config.headers.Authorization = `JWT ${token}`;
      }
      return config;
    },
    err => Promise.reject(err)
  );

  const postLogin = loginObj => api.post('/login', loginObj);
  const postRegister = registerObj => api.post('/register/client', registerObj);
  const getOrders = () => api.get('/orders');
  const getProducts = () => api.get('/products');
  const getProduct = id => api.get(`/products/${id}`);
  const getCategories = () => api.get('/categories');

  return {
    postLogin,
    getOrders,
    getProduct,
    getProducts,
    getCategories,
    postRegister
  };
};

export default create;
