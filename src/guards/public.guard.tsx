import { Outlet, Navigate } from 'react-router-dom';
import { PrivateRoutes } from '../models';

export const PublicGuard = () => {
  const userData = false;

  return userData ? <Navigate replace to={PrivateRoutes.DASHBOARD} /> : <Outlet />;
};
