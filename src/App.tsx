import { Navigate, Route, Routes } from 'react-router-dom';
import {
  createContext,
  lazy,
  Suspense,
  useState,
  useContext,
  useMemo,
} from 'react';
import { PrivateRoutes, PublicRoutes } from './models';
import { AuthGuard, PublicGuard } from './guards';
import Loader from './components/loader/Loader';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import ThemeContextProvider, { ThemeContext } from './context/ThemeContext';
import SidebarContextProvider from './context/SidebarContext';
import ActiveUserContextProvider from './context/ActiveUserContext';

const Login = lazy(() => import('./pages/auth/login/Login'));
const Register = lazy(() => import('./pages/auth/register/Register'));
const Dashboard = lazy(() => import('./pages/app/dashboard/Dashboard'));
const Contacts = lazy(() => import('./pages/app/contacts/Contacts'));
const Rooms = lazy(() => import('./pages/app/rooms/Rooms'));
const Chat = lazy(() => import('./pages/app/chat/Chat'));

function App() {
  const { theme } = useContext(ThemeContext);

  return (
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
                <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
                <Route
                  path={`${PrivateRoutes.CHAT}/:id`}
                  element={
                    <ActiveUserContextProvider>
                      <Chat />
                    </ActiveUserContextProvider>
                  }
                />
                <Route
                  path={`${PrivateRoutes.CHAT}/room/:id`}
                  element={
                    <ActiveUserContextProvider>
                      <Chat />
                    </ActiveUserContextProvider>
                  }
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
  );
}

export default App;
