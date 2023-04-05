import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchAndLoad from '../../../../../hooks/useFetch';
import { showSuccessToast } from '../../../../../utilities';
import { contactsData, deleteContact } from '../../services/contacts-data.service';
import styles from './Contact.module.scss';

const Contact = ({ contactData, getContacts }: any) => {

  const navigate = useNavigate()

  const { loading, callEndpoint } = useFetchAndLoad();
  
  const RemoveContact = async (contactId: any) => {
    await callEndpoint(deleteContact(contactId));
    showSuccessToast('Deleted successfully')
    getContacts()
  };

  return (
    <div className={styles.container}>
      <img src={contactData.profilePic} alt="user logo" />
      <div className={styles.info}>
        <p>{contactData.email}</p>
        <span>{contactData.username}</span>
      </div>
      <div className={styles.options}>
        <i className='fa-solid fa-paper-plane' onClick={() => navigate(`/chat/${contactData._id}`)}></i>
        <i className='fa-solid fa-trash' onClick={() => RemoveContact(contactData._id)}></i>
      </div>
    </div>
  );
};

export default Contact;
