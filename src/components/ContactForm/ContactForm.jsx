import React, { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ pushToContact }) => {
  const [clientName, setName] = useState('');
  const [clientNumber, setNumber] = useState('');

  const handleChange = ev => {
    switch (ev.currentTarget.name) {
      case 'clientName':
        setName(ev.currentTarget.value);
        break;
      case 'clientNumber':
        setNumber(ev.currentTarget.value);
        break;
      default:
        alert('Something went wrong');
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    const client = {
      name: clientName,
      number: clientNumber,
    };
    pushToContact(client);
    setNumber('');
    setName('');
    return;
  };

  return (
    <form className={css.contactForm} onSubmit={onSubmit}>
      <label htmlFor="" className={css.formLabel}>
        Name
        <input
          type="text"
          name="clientName"
          className={css.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={clientName}
          onChange={handleChange}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="" className={css.formLabel}>
        Phone number
        <input
          type="tel"
          name="clientNumber"
          className={css.input}
          value={clientNumber}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.submit}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  pushToContact: PropTypes.func.isRequired,
};
