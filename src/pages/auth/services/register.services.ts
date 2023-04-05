import authFetch from '../../../interceptors/Interceptor';
import { loadAbort } from '../../../utilities/load-abort-axios.utility';

const apiUrl = 'http://localhost:3001';

const registerURL = apiUrl + '/auth/register';

export const RegisterUser = (value: any): any => {
  const controller = loadAbort();
  return {
    call: authFetch.post(registerURL, value, {
      signal: controller.signal,
    }),
    controller
  };
};
