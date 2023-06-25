import React, { useEffect, useState } from 'react';
import { TextInput } from './components/textInput/TextInput';
import UserHeader from './components/userHeader/UserHeader';
import './Chat.scss';
import { useContext } from 'react';
import useFetchAndLoad from '../../../hooks/useFetch';
import Loader from '../../../components/loader/Loader';
import { AuthContext } from '../../../context/AuthContext';
import { useParams, useSearchParams } from 'react-router-dom';
import { getMessages, getRoomMessages } from './services/messages.service';
import { getRoomData, getUserData } from './services/userHeader.service';
import { ActiveUserContext } from '../../../context/ActiveUserContext';
import Message from './components/message/Message';
import { socket } from '../../../socket';

const Chat = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { setActiveUser } = useContext(ActiveUserContext);
  const [messages, setMessages] = useState<any>([]); 1

  useEffect(() => {
    window.location.href.includes('room') ?
      Promise.all([
        callEndpoint(getRoomMessages(id)),
        callEndpoint(getRoomData(id)),
      ]).then(([messages, userData]) => {
        setMessages(messages.data);
        setActiveUser(userData);
      })
      :
      Promise.all([
        callEndpoint(getMessages(user._id, id)),
        callEndpoint(getUserData(id))
      ]).then(([messages, userData]) => {
        setMessages(messages.data);
        setActiveUser(userData);
      });
  }, []);

  useEffect(() => {
    socket.on('addedMessage', (data) => {
      if (window.location.href.includes('room')) {
        if (data.to === id) {
          setMessages([...messages, data])
          const objDiv: any = document.getElementById("messagesContainer");      
      objDiv.scrollTo(0, objDiv.scrollHeight)
          return
        }
      } else if (data.from === user._id || data.to === user._id) {
        setMessages([...messages, data])
        const objDiv: any = document.getElementById("messagesContainer");      
      objDiv.scrollTo(0, objDiv.scrollHeight)
        return
      }
    })
  })


  if (loading) {
    return <Loader show={loading} />;
  }

  if (!loading) {
    return (
      <div className="Chat">
        <UserHeader />
        <div className="Chat-messagesList" id='messagesContainer'>
          {messages?.length > 0 && (
            <div>
              {messages?.map((message: any) => (
                <Message key={message._id} messageData={message} />
              ))}
            </div>
          )}
        </div>
        <TextInput />
      </div>
    );
  }
};

export default Chat;
