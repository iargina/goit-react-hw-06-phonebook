import React from 'react';
import css from './Filter.module.css';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';

export const Filter = ({ renderOnChange }) => {
  const filter = useSelector(getFilter);
  return (
    <>
      <input
        type="text"
        name="filter"
        className={css.input}
        value={filter}
        onChange={renderOnChange}
      />
    </>
  );
};
