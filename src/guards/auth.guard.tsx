import { Outlet, Navigate } from 'react-router-dom';
import { AppWrapper, Sidebar } from '../components';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { socket } from '../socket';

export const AuthGuard = () => {
  
  const { user } = useContext(AuthContext);

  return user ? (
    <>
      <AppWrapper />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};
