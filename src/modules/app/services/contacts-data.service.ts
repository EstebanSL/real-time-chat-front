import authFetch from '../../../interceptors/Interceptor';
import { loadAbort } from '../../../utilities/load-abort-axios.utility';

const apiUrl = 'http://localhost:3001';

const dashboardURL = apiUrl + '/users/contacts';

export const contactsData = (): any => {
  const controller = loadAbort();
  return {
    call: authFetch.get(dashboardURL, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      }
    }),
    controller
  };
};