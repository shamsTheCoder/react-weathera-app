import React from 'react';
import './SearchBar.css';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ text, submit, func }) => (
  <form className="SearchFrom" onSubmit={submit}>
    <input type={"text"} placeholder="Please enter location" className="SearchInput" onChange={text} />
    <span className="SearchIcon" onClick={func}>
      <FiSearch />
    </span>
  </form>
);

export default SearchBar;
