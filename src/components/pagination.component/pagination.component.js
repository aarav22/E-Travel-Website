import React from 'react';
import './pagination.component.css'
import { Pagination } from '@material-ui/lab';


const PaginationComponent = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = Math.ceil(totalPosts / postsPerPage); 
  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  return (
    <div className="component-main">
      {/* <Pagination count={10} color="primary" /> */}
      
      <Pagination count={pageNumbers} onChange={(e,page) => {console.log(page); paginate(page)}}  size="large"  variant="outlined" color="primary"
              shape="rounded" siblingCount={pageNumbers} boundaryCount={pageNumbers} showLastButton={true} showFirstButton={false}/>


      {/* <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number} 
            </button>
          </li>
        ))}
        </ul> */}
    </div>
  );
};

export default PaginationComponent;
