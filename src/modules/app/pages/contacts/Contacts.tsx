import React, { useState } from 'react';
import { useAsync } from '../../../../hooks/useAsync';
import useFetchAndLoad from '../../../../hooks/useFetch';
import { contactsData } from '../../services/contacts-data.service';

const Contacts = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const getApiData = async () => await callEndpoint(contactsData());
  const [contactsList, setContactsList] = useState<any>(null);

  useAsync(
    getApiData,
    (data: any) => setContactsList(data.data),
    () => {}
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading) {
    return (
      <div>
        <div>Add Contact</div>
        {contactsList?.length > 0 &&
          contactsList?.map((contact: any) => <div>Contact</div>)}

        {contactsList?.length === 0 && <div>Empty list</div>}
      </div>
    );
  }
};

export default Contacts;
