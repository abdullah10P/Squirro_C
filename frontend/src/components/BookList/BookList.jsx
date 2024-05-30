import React from "react";
import { getAuthorsMap, getStoreBooks } from "../../utils/BookUtils";
import { NO_DATA_AVAILABLE, BEST_SELLING_BOOKS } from "../../utils/constants";
import "./styles.scss";

const BookList = ({ books, included }) => {
  const authorsMap = getAuthorsMap(included);
  const storeBooks = getStoreBooks(books, included, authorsMap);

  return (
    <div className="books">
      <table>
        <thead>
          <tr>
            <th colSpan="2" className="text-left">
              {BEST_SELLING_BOOKS}
            </th>
          </tr>
        </thead>
        <tbody>
          {storeBooks.length > 0 ? (
            storeBooks.slice(0, 2).map((book, index) => (
              <tr key={index}>
                <td>{book.name}</td>
                <td>{book.author}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">{NO_DATA_AVAILABLE}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
