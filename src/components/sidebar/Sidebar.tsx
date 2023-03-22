import React, { useState } from 'react';
import { logout } from '../../utilities';
import './Sidebar.scss';
import { useContext } from 'react';
import { SidebarContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../models';
import logo from '../../assets/app-logo.jpg'; 

const options = [
  {
    text: 'Dashboard',
    iconClass: 'fa-solid fa-cubes',
    linkTo: PrivateRoutes.DASHBOARD
  },
  {
    text: 'contacts',
    iconClass: 'fa-solid fa-address-book',
    linkTo: PrivateRoutes.CONTACTS
  },
  {
    text: 'Rooms',
    iconClass: 'fa-solid fa-user-group',
    linkTo: PrivateRoutes.ROOMS
  },
];


export const Sidebar = () => {

  const { sidebarState, toggleSidebar } = useContext(SidebarContext)

  const navigate = useNavigate()

  const changeSidebarState = () => {
    toggleSidebar(!sidebarState)
    toggleSidebar()
  }

  return (
    <div className={sidebarState ? `sidebar open` : `sidebar`}>
      <div className="sidebar-profile">
        <img
          className="profile-logo"
          src={logo}
          alt="profile-icon"
        />
        <p className="profile-name">Profile name</p>
        <div className="open-close" onClick={() => changeSidebarState()}>
          <i
            className={
              sidebarState ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left'
            }
          ></i>
        </div>
      </div>
      <div className="sidebar-items">
        {options.map((option, index) => (
          <Item option={option} key={index} isOpen={sidebarState} operation={ () => navigate(option.linkTo)} />
        ))}
      </div>
      <hr  className={
              !sidebarState ? 'separator' : 'separator separator-close'
            }/>
      <div className="sidebar-options">
        <Item option={{ text: 'Light Theme', iconClass: 'fa-solid fa-moon' }} isOpen={sidebarState}  />
        <Item option={{ text: 'Logout', iconClass: 'fa-solid fa-circle-xmark'}} isOpen={sidebarState} operation={ logout } />
      </div>
    </div>
  );
};


const Item = ({ option, isOpen, operation }: any) => {
  return (
    <div className={!isOpen ? 'Item' : 'Item Item-close'}  onClick={ operation } >
      <div className={!isOpen ? 'Item-icon' : 'Item-icon-close'}>
        <i className={option.iconClass}></i>
      </div>
      <p className={!isOpen ? 'Item-text' : 'Item-text hidden'}>{option.text}</p>
    </div>
  );
};
