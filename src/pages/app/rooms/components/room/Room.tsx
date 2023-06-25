import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchAndLoad from '../../../../../hooks/useFetch';
import { showSuccessToast } from '../../../../../utilities';
import styles from './Room.module.scss';
import { socket } from '../../../../../socket';
import { AuthContext } from '../../../../../context/AuthContext';
import { deleteRoom, joinRoom } from '../../services/rooms-data.service';

const Room = ({ roomData }: any) => {

  const navigate = useNavigate()

  const { callEndpoint } = useFetchAndLoad();
  const { user } = useContext(AuthContext)

  const RemoveRoom = async (contactId: any) => {
    await callEndpoint(deleteRoom(contactId));
    socket.emit('deleteContact', { remover: user, removed: roomData });
    showSuccessToast('Deleted successfully')
  };

  const joinAndNavigate = async () => {
    await callEndpoint(joinRoom(roomData._id));
    navigate(`/chat/room/${roomData._id}`)
  }

  return (
    <div className={styles.container}>
      <span>{roomData.name}</span>
      <div className={styles.options}>
        {!roomData.users.includes(user._id)
          ? <i className='fa-solid fa-right-to-bracket' onClick={() => joinAndNavigate()}></i>
          : <i className='fa-solid fa-paper-plane' onClick={() => navigate(`/chat/room/${roomData._id}`)}></i>
        }
        <i className='fa-solid fa-trash' onClick={() => RemoveRoom(roomData._id)}></i>
      </div>
    </div>
  );
};

export default Room;
