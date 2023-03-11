import { Navigate, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import axios from 'axios';
import { Sidebar } from './components/sidebar/Sidebar';
import { Login, Register } from './modules/auth/pages';

export const AuthContext = createContext<any>(null);

function App() {
  return (
    <div className="App">
      <Routes>
        {true ? (
          <Route>
            <Route path="/app" element={<Sidebar />} />
            <Route path="*" element={<Navigate to="/app" />} />
          </Route>
        ) : (
          <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
