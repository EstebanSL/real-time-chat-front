import { useParams } from "react-router-dom";
import authFetch from "../../../../interceptors/Interceptor";
import { loadAbort } from "../../../../utilities";



const apiUrl = 'http://localhost:3001';

const messagesURL = apiUrl + '/users/';

export const getUserData = (userId: any): any => {

  const controller = loadAbort();
  return {
    call: authFetch.get(messagesURL + `user/${userId}`, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      },
    }),
    controller
  };
};
