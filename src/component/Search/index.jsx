import React, {useContext} from 'react';

import styles from './Search.module.scss'
import {SearchContext} from "../../App";

function Search() {
  const {searchValue, setSearchValue} = useContext(SearchContext)

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
          stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Поиск пиццы..."
             className={styles.input}/>
      {searchValue && (
        <svg onClick={() => setSearchValue('')} className={styles.clearIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="white"/>
          <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

export default Search;
