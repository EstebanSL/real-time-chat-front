import React, { useState } from 'react';
import { logout } from '../../utilities';
import './Sidebar.scss';

const options = [
  {
    text: 'Dashboard',
    iconClass: 'fa-solid fa-cubes',
    linkTo: '/'
  },
  {
    text: 'contacts',
    iconClass: 'fa-solid fa-address-book',
    linkTo: '/contacts'
  },
  {
    text: 'Rooms',
    iconClass: 'fa-solid fa-user-group',
    linkTo: '/rooms'
  },
];


export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isOpen ? `sidebar open` : `sidebar`}>
      <div className="sidebar-profile">
        <img
          className="profile-logo"
          src="./src/assets/app-logo.jpg"
          alt="profile-icon"
        />
        <p className="profile-name">Profile name</p>
        <div className="open-close" onClick={() => setIsOpen(!isOpen)}>
          <i
            className={
              isOpen ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left'
            }
          ></i>
        </div>
      </div>
      <div className="sidebar-items">
        {options.map((option, index) => (
          <Item option={option} key={index} isOpen={isOpen} operation={ () => console.log('navigate to' + option.linkTo)} />
        ))}
      </div>
      <hr  className={
              !isOpen ? 'separator' : 'separator separator-close'
            }/>
      <div className="sidebar-options">
        <Item option={{ text: 'Light Theme', iconClass: 'fa-solid fa-moon' }} isOpen={isOpen}  />
        <Item option={{ text: 'Logout', iconClass: 'fa-solid fa-circle-xmark'}} isOpen={isOpen} operation={ logout } />
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
