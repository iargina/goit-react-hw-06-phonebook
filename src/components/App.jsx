import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';

export const App = () => {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();
  const deleteClient = id => {
    dispatch(deleteContact(id));
    return;
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const pushToContact = client => {
    const result = contacts.find(
      el => el.name.toLowerCase() === client.name.toLowerCase()
    );
    if (result) {
      alert(`${client.name} is already in your contact list`);
      return;
    }
    const newClient = { id: nanoid(), ...client };
    dispatch(addContact(newClient));
  };

  const renderOnChange = ev => {
    return dispatch(setFilter(ev.currentTarget.value));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        color: '#010101',
      }}
    >
      <h2 className="formTitle">PhoneBook</h2>
      <ContactForm pushToContact={pushToContact} />
      <h2 className="contactListTitle">Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter renderOnChange={renderOnChange} />
          <ContactList deleteClient={deleteClient} />
        </>
      ) : (
        <p>Your have no contacts in your phone book</p>
      )}
    </div>
  );
};
