import { Outlet, Navigate } from 'react-router-dom';
import { AppWrapper, Sidebar } from '../components';

export const AuthGuard = () => {
  const userData = true;

  return userData ? (
    <>
      <AppWrapper />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};
