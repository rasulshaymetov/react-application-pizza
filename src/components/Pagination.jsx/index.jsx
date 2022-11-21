import React from "react";
import styles from "./Pagination.module.scss"
import ReactPaginate from 'react-paginate';
export const Pagination = ({onChangePage, currentPage}) => {
 
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event => onChangePage(event.selected + 1))}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
