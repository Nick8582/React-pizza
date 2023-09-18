import React from 'react';
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, onChange}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={event => onChange(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
}

export default Pagination;
