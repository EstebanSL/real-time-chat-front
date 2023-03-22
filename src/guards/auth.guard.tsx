import { Outlet, Navigate } from 'react-router-dom';
import { AppWrapper, Sidebar } from '../components';

export const AuthGuard = () => {
  const userData = false;

  return userData ? (
    <>
      <AppWrapper />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};
