import axios from 'axios';
import { toast } from 'react-hot-toast';
import { showErrorToast } from '../utilities';

const authFetch = axios.create({
  baseURL: 'http://localhost:3001',
});

authFetch.interceptors.request.use(
  (request) => {
    console.log('request sent');
    return request;
  },
  (error) => {
    console.log('request error')
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    console.log('got response');
    return response;
  },
  (error) => {
    console.log('response error')
    if(error.name !== 'CanceledError')
      showErrorToast(error.response)
    return Promise.reject(error);
  }
);

export default authFetch;