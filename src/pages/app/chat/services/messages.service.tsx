import { useParams } from "react-router-dom";
import authFetch from "../../../../interceptors/Interceptor";
import { loadAbort } from "../../../../utilities";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";


const apiUrl = 'http://localhost:3001';

const messagesURL = apiUrl + '/messages';

export const getMessages = (userId: any, targetId: any): any => {

  const controller = loadAbort();
  return {
    call: authFetch.get(messagesURL + `?userId=${userId}&receiverId=${targetId}`, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      },
    }),
    controller
  };
};

export const sendMessage = (value: any): any => {
  

  const controller = loadAbort();
  return {
    call: authFetch.post(messagesURL, value, {
      signal: controller.signal,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTBmMTVlMjEwYTU2ZjkxNjllM2RlNCIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY3ODgzMTk2Nn0.sYOgMZPoPuxPr0QV9RPHJHpr_C3tbRFxmHfKBKKFg0M'
      },
    }),
    controller
  };
};