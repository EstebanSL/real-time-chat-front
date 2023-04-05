import { createContext, useState } from 'react'

export const SidebarContext = createContext<any>(false);

import React from 'react'

const SidebarContextProvider = ( {children}: any) => {

  const [sidebarState, setsidebarState] = useState(true);

  
  const toggleSidebar = () => {
    setsidebarState(!sidebarState);
  };

  return (
    <SidebarContext.Provider value={{ sidebarState, toggleSidebar }}>
      { children }
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider
