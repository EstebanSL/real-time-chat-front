import React from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarContext } from '../../context';
import { Sidebar } from '../sidebar/Sidebar';
import './App-wrapper.scss';

export const AppWrapper = () => {

  const { sidebarState } = useContext(SidebarContext);

  return (
    <div className={sidebarState ? 'layout-close' : 'layout-open'}>
      <>
        <Sidebar />
        <Outlet />
      </>
    </div>
  );
};
