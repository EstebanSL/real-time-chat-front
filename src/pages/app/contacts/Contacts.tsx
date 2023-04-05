import React, { useState } from 'react';
import { useAsync } from '../../../hooks/useAsync';
import useFetchAndLoad from '../../../hooks/useFetch';
import useModal from '../../../hooks/useModal';
import AddContactModal from './components/addContactModal/AddContactModal';
import { contactsData } from './services/contacts-data.service';
import styles from './Contacts.module.scss';
import Contact from './components/contact/Contact';
import Loader from '../../../components/loader/Loader';

const Contacts = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const getApiData = async () => await callEndpoint(contactsData());
  const [contactsList, setContactsList] = useState<any>([]);
  const { isShowing, toggle } = useModal();

  useAsync(
    getApiData,
    (data: any) => setContactsList(data || []),
    () => {},
    []
  );

  const getContacts = async (data: any) => {
    const result = await callEndpoint(contactsData());
    setContactsList(result.data);
  };

  if (loading) {
    return <Loader show={loading} />
  }

  if (!loading) {
    return (
      <div className={styles.container}>
        <h2>Contacts</h2>
        <button className={styles.button} onClick={() => toggle()}>
          Add contact
          <i className='fa-solid fa-plus'></i>
        </button>
        <AddContactModal show={isShowing} onCloseButtonClick={toggle} getContacts={getContacts} />
        {contactsList?.length > 0 && (
          <div className={styles.contactsList}>
            {contactsList?.map((contact: any) => (
              <Contact key={contact._id} contactData={contact} getContacts={getContacts} />
            ))}
          </div>
        )}
        {contactsList?.length === 0 && <div>Empty list</div>}
      </div>
    );
  }
};

export default Contacts;
