import { Navigate, Route, Routes } from 'react-router-dom';
import {
  createContext,
  lazy,
  Suspense,
  useState,
  useContext,
  useMemo,
} from 'react';
import axios from 'axios';
import { Sidebar } from './components/sidebar/Sidebar';
import { AppWrapper } from './components';
import { SidebarContext } from './context';
import { PrivateRoutes, PublicRoutes } from './models';
import { AuthGuard, PublicGuard } from './guards';
import Loader from './components/loader/Loader';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import ThemeContextProvider, { ThemeContext } from './context/ThemeContext';
import SidebarContextProvider from './context/SidebarContext';

const Login = lazy(() => import('./modules/auth/pages/login/Login'));
const Register = lazy(() => import('./modules/auth/pages/register/Register'));
const Dashboard = lazy(() => import('./modules/app/pages/dashboard/Dashboard'));
const Contacts = lazy(() => import('./modules/app/pages/contacts/Contacts'));
const Rooms = lazy(() => import('./modules/app/pages/rooms/Rooms'));
const Chat = lazy(() => import('./modules/app/pages/chat/Chat'));

function App() {

  const { theme } = useContext(ThemeContext)

  return (
    <ThemeContextProvider>
      <div className="App" data-theme={theme}>
        <AuthContextProvider>
        <Suspense fallback={<Loader />}>
            <SidebarContextProvider>
              <Routes>
                <Route element={<PublicGuard />}>
                  <Route path={PublicRoutes.LOGIN} element={<Login />} />
                  <Route path={PublicRoutes.REGISTER} element={<Register />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Route>

                <Route element={<AuthGuard />}>
                  <Route
                    path={PrivateRoutes.DASHBOARD}
                    element={<Dashboard />}
                  />
                  <Route
                    path={`${PrivateRoutes.CHAT}/:id`}
                    element={<Chat />}
                  />
                  <Route path={PrivateRoutes.CONTACTS} element={<Contacts />} />
                  <Route path={PrivateRoutes.ROOMS} element={<Rooms />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Route>
              </Routes>
            </SidebarContextProvider>
        </Suspense>
          </AuthContextProvider>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
