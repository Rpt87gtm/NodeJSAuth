import axios from 'axios';
import store from '../../shared/store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch('auth/logout');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
