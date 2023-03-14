import { Outlet, Navigate } from 'react-router-dom';
import { PrivateRoutes } from '../models';

export const PublicGuard = () => {
  const userData = true;

  return userData ? <Navigate replace to={PrivateRoutes.DASHBOARD} /> : <Outlet />;
};
