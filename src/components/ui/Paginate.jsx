import React from 'react';
import ReactPaginate from 'react-paginate';

export const Paginate = ({ pageCount, handlePageClick }) => {
  return (
    <React.Fragment>
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        activeClassName={'page-item active'}
        disabledClassName={'page-item disabled'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        // breakClassName={"page-item"}
        breakLinkClassName={'page-link'}
        // forcePage={activePage}
      />
    </React.Fragment>
  );
};
