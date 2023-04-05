import React, { useState } from 'react';
import './Sidebar.scss';
import { useContext } from 'react';
import { SidebarContext } from '../../context';
import { NavLink, useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../models';
import logo from '../../assets/app-logo.jpg';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

const options = [
  {
    text: 'Dashboard',
    iconClass: 'fa-solid fa-cubes',
    linkTo: PrivateRoutes.DASHBOARD,
  },
  {
    text: 'contacts',
    iconClass: 'fa-solid fa-address-book',
    linkTo: PrivateRoutes.CONTACTS,
  },
  {
    text: 'Rooms',
    iconClass: 'fa-solid fa-user-group',
    linkTo: PrivateRoutes.ROOMS,
  },
];

export const Sidebar = () => {
  const { sidebarState, toggleSidebar } = useContext(SidebarContext);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const changeSidebarState = () => {
    toggleSidebar(!sidebarState);
    toggleSidebar();
  };

  return (
    <div className={sidebarState ? `sidebar open` : `sidebar`}>
      <div className="sidebar-profile">
        <img className="profile-logo" src={logo} alt="profile-icon" />
        <p className="profile-name">Profile name</p>
        <div className="open-close" onClick={() => changeSidebarState()}>
          <i
            className={
              sidebarState
                ? 'fa-solid fa-angles-right'
                : 'fa-solid fa-angles-left'
            }
          ></i>
        </div>
      </div>
      <div className="sidebar-items">
        {options.map((option, index) => (
          <Item
            option={option}
            key={index}
            isOpen={sidebarState}
            operation={() => navigate(option.linkTo)}
          />
        ))}
      </div>
      <hr
        className={!sidebarState ? 'separator' : 'separator separator-close'}
      />
      <div className="sidebar-options">
        <i
          className={`
          sidebar-icon + ${
            theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'
          }`}
          onClick={() => toggleTheme()}
        >
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </i>
        <i
          className="sidebar-icon sidebar-icon--error fa-solid fa-circle-xmark"
          onClick={() => logout()}
        ><span className={`${sidebarState ? 'sidebar-icon--hidden' : ''}`}>Logout</span></i>
      </div>
    </div>
  );
};

const Item = ({ option, isOpen }: any) => {
  return (
    <NavLink
      to={option.linkTo}
      className={({ isActive }) => {
        return `Item ${
          isActive && isOpen
            ? 'Item-active Item-close'
            : isActive
            ? 'Item-active'
            : isOpen
            ? 'Item-close'
            : ''
        }`;
      }}
    >
      <div className={!isOpen ? 'Item-icon' : 'Item-icon-close'}>
        <i className={option.iconClass}></i>
      </div>
      <p className={!isOpen ? 'Item-text' : 'Item-text hidden'}>
        {option.text}
      </p>
    </NavLink>
  );
};
