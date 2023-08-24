import React from 'react';
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss'

function Pagination({onChange}) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={event => onChange(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}/>
  );
}

export default Pagination;
