import React from 'react';
import { Message } from '../../components/message/Message';
import { TextInput } from '../../components/textInput/TextInput';
import UserHeader from '../../components/userHeader/UserHeader';
import './Chat.scss';

const Chat = () => {
  return (
    <div className="Chat">
      <UserHeader />
      <div className="Chat-messagesList">
        <Message content='own' />
        <Message content='other' />
        <Message content='other' />
      </div>
      <TextInput />
    </div>
  );
};

export default Chat
