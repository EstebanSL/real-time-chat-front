import React, { createContext, useState } from 'react';

export const ActiveUserContext = createContext<any>(null);

const ActiveUserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  const setActiveUser = (userInfo: any) => {
    setUser(userInfo);
  };

  const clearActiveUser = () => {
    ('user');
  };

  return (
    <ActiveUserContext.Provider
      value={{ user, setActiveUser, clearActiveUser }}
    >
      {children}
    </ActiveUserContext.Provider>
  );
};

export default ActiveUserContextProvider;
