import React, { useEffect, useState } from 'react';
import { TextInput } from './components/textInput/TextInput';
import UserHeader from './components/userHeader/UserHeader';
import './Chat.scss';
import { useContext } from 'react';
import useFetchAndLoad from '../../../hooks/useFetch';
import Loader from '../../../components/loader/Loader';
import { AuthContext } from '../../../context/AuthContext';
import { useParams, useSearchParams } from 'react-router-dom';
import { getMessages } from './services/messages.service';
import { getUserData } from './services/userHeader.service';
import { ActiveUserContext } from '../../../context/ActiveUserContext';
import Message from './components/message/Message';

const Chat = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { setActiveUser } = useContext(ActiveUserContext);
  const [messages, setMessages] = useState<any>([]);

  const refreshMessages = () => {
    getUserMessages()
  };

  const getUserMessages = async () => {
    const result = await callEndpoint(getMessages(user._id, id));
    setMessages(result.data);
  };

  useEffect(() => {
    Promise.all([
      callEndpoint(getMessages(user._id, id)),
      callEndpoint(getUserData(id)),
    ]).then(([messages, userData]) => {
      console.log(messages, userData);
      setMessages(messages.data);
      setActiveUser(userData);
    });
  }, []);

  if (loading) {
    return <Loader show={loading} />;
  }

  if (!loading) {
    return (
      <div className="Chat">
        <UserHeader />
        <div className="Chat-messagesList">
          {messages?.length > 0 && (
            <div className="">
              {messages?.map((message: any) => (
                <Message key={message._id} messageData={message} />
              ))}
            </div>
          )}
          <button onClick={() => refreshMessages()}>refresh</button>
        </div>
        <TextInput />
      </div>
    );
  }
};

export default Chat;
