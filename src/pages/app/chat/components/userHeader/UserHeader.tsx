import './UserHeader.scss'
import logo from '../../../../../assets/app-logo.jpg'; 
import { useParams } from 'react-router-dom';
import useFetchAndLoad from '../../../../../hooks/useFetch';
import { getUserData } from '../../services/userHeader.service';
import { useEffect, useState } from 'react';
import { useAsync } from '../../../../../hooks/useAsync';

const UserHeader = () => {

  return (
    <div className='userHeader'>
      <img src={logo} alt="user icon" className='userHeader-icon' />
      <p className='userHeader-name'>text</p>
    </div>
  )
}

export default UserHeader