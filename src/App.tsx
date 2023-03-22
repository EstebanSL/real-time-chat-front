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

export const AuthContext = createContext<any>(null);

const Login = lazy(() => import('./modules/auth/pages/login/Login'));
const Register = lazy(() => import('./modules/auth/pages/register/Register'));
const Dashboard = lazy(() => import('./modules/app/pages/dashboard/Dashboard'));
const Contacts = lazy(() => import('./modules/app/pages/contacts/Contacts'));
const Rooms = lazy(() => import('./modules/app/pages/rooms/Rooms'));
const Chat = lazy(() => import('./modules/app/pages/chat/Chat'));

const ThemeContext = createContext<any>({value: 'dark', setValue: () => {}});

function App() {
  const [sidebarState, setsidebarState] = useState(false);
  const [theme, setTheme] = useState<string>('light');

  const provided = useMemo(
    () => ({
      value: theme,
      setValue: () => setTheme(theme === 'light' ? 'dark' : 'dark'),
    }),
    [theme]
  );

  const toggleSidebar = () => {
    setsidebarState(!sidebarState);
  };

  return (
    <ThemeContext.Provider value={{provided}}>
      <div className="App" data-theme={theme}>
        <Suspense fallback={<>Loading</>}>
          <SidebarContext.Provider value={{ sidebarState, toggleSidebar }}>
            <Routes>
              <Route element={<PublicGuard />}>
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route path={PublicRoutes.REGISTER} element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Route>

              <Route element={<AuthGuard />}>
                <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
                <Route path={`${PrivateRoutes.CHAT}/:id`} element={<Chat />} />
                <Route path={PrivateRoutes.CONTACTS} element={<Contacts />} />
                <Route path={PrivateRoutes.ROOMS} element={<Rooms />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Route>
            </Routes>
          </SidebarContext.Provider>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
