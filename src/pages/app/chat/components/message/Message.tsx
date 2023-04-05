import React, { useContext } from 'react';
import './Message.scss';
import { ActiveUserContext } from '../../../../../context/ActiveUserContext';
import { AuthContext } from '../../../../../context/AuthContext';

const Message = ({ messageData }: any) => {

  const { user } = useContext(AuthContext);
  const { user: owner} = useContext(ActiveUserContext);

  const isOwner = messageData.from === user._id

  console.log(user._id, messageData.from)

  return (
    <div className={!isOwner ? 'message own' : 'message other'}>
      <div>{messageData.content}</div>
      <svg
        viewBox="0 0 8 13"
        height="13"
        width="8"
        className={!isOwner ? 'message-corner-left' : 'message-corner-right'}
        preserveAspectRatio="xMidYMid meet"
        version="1.1"
        x="0px"
        y="0px"
        enableBackground="new 0 0 8 13"
        xmlSpace="preserve"
      >
        <path
          opacity="0.13"
          d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
        ></path>
        <path
          fill="currentColor"
          d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
        ></path>
      </svg>
    </div>
  );
};

export default Message
