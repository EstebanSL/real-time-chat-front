import axios from 'axios';
import { showErrorToast } from '../utilities';

const authFetch = axios.create({
  baseURL: 'http://localhost:3001',
});

authFetch.interceptors.request.use(
  (request) => {
    request.headers['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token') || '');
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.name !== 'CanceledError') {
      showErrorToast(error.response?.data?.message || error.message)
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default authFetch;