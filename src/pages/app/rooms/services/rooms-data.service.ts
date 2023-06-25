import authFetch from "../../../../interceptors/Interceptor";
import { loadAbort } from "../../../../utilities";


const apiUrl = 'http://localhost:3001';

const roomsURL = apiUrl + '/rooms/';

export const roomsData = (): any => {
  
  const controller = loadAbort();
  return {
    call: authFetch.get(roomsURL, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDE1MDk1ZWI3ZjNjNDFhMjI4MzQ1MiIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwiaWF0IjoxNjgwNjUzMzI5fQ.AqX-HCN-7ZmTkzTnHV_mlNWEEfhBwKatvk1MoSPjgx8'
      }
    }),
    controller
  };
};


export const addRoom = (value: any): any => {
  const controller = loadAbort();
  return {
    call: authFetch.post(roomsURL + '/create', value, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      }
    }),
    controller
  };
};

export const joinRoom = (value: any): any => {
  const controller = loadAbort();
  return {
    call: authFetch.patch(roomsURL + '/join/' + value, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      }
    }),
    controller
  };
};

export const exitRoom = (value: any): any => {
  const controller = loadAbort();
  return {
    call: authFetch.patch(roomsURL + '/exit/' + value, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      }
    }),
    controller
  };
};


export const deleteRoom = (value: any): any => {
  const controller = loadAbort();
  return {
    call: authFetch.delete(roomsURL + '/delete/' + value, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      },
      data: {
        roomId: value
      }
    }),
    controller
  };
};