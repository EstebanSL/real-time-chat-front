import { Outlet, Navigate } from 'react-router-dom';
import { PrivateRoutes } from '../models';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const PublicGuard = () => {

  const { user } = useContext(AuthContext);

  return user ? <Navigate replace to={PrivateRoutes.DASHBOARD} /> : <Outlet />;
};
