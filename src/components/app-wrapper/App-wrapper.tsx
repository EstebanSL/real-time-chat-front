import React from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarContext } from '../../context';
import { Sidebar } from '../sidebar/Sidebar';
import './App-wrapper.scss';

export const AppWrapper = () => {
  const { sidebarState } = useContext(SidebarContext);

  return (
    <>
      <Sidebar />
      <div className='layout'>
        <Outlet />
      </div>
    </>
  );
};
