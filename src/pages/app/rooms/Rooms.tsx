import React, { useContext, useEffect, useState } from 'react'
import { useAsync } from '../../../hooks/useAsync';
import { AuthContext } from '../../../context/AuthContext';
import { roomsData } from './services/rooms-data.service';
import useFetchAndLoad from '../../../hooks/useFetch';
import Loader from '../../../components/loader/Loader';
import styles from './Rooms.module.scss';
import AddRoomModal from './components/addRoomModal/AddRoomModal';
import Room from './components/room/Room';
import useModal from '../../../hooks/useModal';

const Rooms = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const getApiData = async () => await callEndpoint(roomsData());
  const [roomsList, setRoomsList] = useState<any>([]);
  const { user } = useContext(AuthContext)
  const { isShowing, toggle } = useModal();

  useAsync(
    getApiData,
    (data: any) => setRoomsList(data || []),
    () => { },
    []
  );

  if (loading) {
    return <Loader show={loading} />
  }


  if (!loading) {
   
    return (
      <div className={styles.container}>
        <h2>Rooms</h2>
        <button className={styles.button} onClick={() => toggle()}>
          create room
          <i className='fa-solid fa-plus'></i>
        </button>
        <AddRoomModal show={isShowing} onCloseButtonClick={toggle} />
        {roomsList?.length > 0 && (
          <div className={styles.contactsList}>
            {roomsList?.map((room: any) => (
              <Room key={room._id} roomData={room} />
            ))}
          </div>
        )}
        {roomsList?.length === 0 && <div>Empty list</div>}
      </div>
    );
  }
}

export default Rooms