import authFetch from "../../../../interceptors/Interceptor";
import { loadAbort } from "../../../../utilities";


const apiUrl = 'http://localhost:3001';

const contactsURL = apiUrl + '/users/';

export const contactsData = (): any => {
  
  const controller = loadAbort();
  return {
    call: authFetch.get(contactsURL + 'contacts', {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDE1MDk1ZWI3ZjNjNDFhMjI4MzQ1MiIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwiaWF0IjoxNjgwNjUzMzI5fQ.AqX-HCN-7ZmTkzTnHV_mlNWEEfhBwKatvk1MoSPjgx8'
      }
    }),
    controller
  };
};


export const addContact = (value: any): any => {
  const controller = loadAbort();
  return {
    call: authFetch.post(contactsURL + 'add', value, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      }
    }),
    controller
  };
};


export const deleteContact = (value: any): any => {
  const controller = loadAbort();
  return {
    call: authFetch.delete(contactsURL + 'remove', {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      },
      data: {
        userId: value
      }
    }),
    controller
  };
};