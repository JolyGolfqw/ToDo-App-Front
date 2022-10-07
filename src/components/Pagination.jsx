import React from "react";

export default function Pagination({ todosPerPage, totalTodo, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= (totalTodo / todosPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
              <a href="!#" onClick={() => paginate(number)}>{number}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
