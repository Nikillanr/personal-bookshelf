import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BookShelf() {
  const navigate = useNavigate();
  const [shelf, setShelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf") || "[]");
    setShelf(savedBooks);
  }, []);

  const removeFromShelf = (bookKey) => {
    const updatedShelf = shelf.filter((book) => book.key !== bookKey);
    setShelf(updatedShelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedShelf));
    toast("Book removed from the Shelf", {
      icon: "🫡😲",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
    });
  };

  const handleNavigateBack = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="booksearch">
        <div className="search">
          <span>My Bookshelf</span>
          <div className="shelf">
            <button onClick={handleNavigateBack} className="b-shelf">
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
      <div className="display">
        {shelf.length === 0 ? (
          <p>Bookshelf is kinda lonely...</p>
        ) : (
          shelf.map((book) => (
            <div key={book.key} className="book-card">
              <h3>Book Title: {book.title}</h3>
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={`${book.title} cover`}
                  className="book-cover"
                />
              ) : (
                <p>No cover pic available</p>
              )}
              <h3>Edition Count: {book.edition_count}</h3>
              <button
                onClick={() => removeFromShelf(book.key)}
                className="b-card"
              >
                Remove from Shelf
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookShelf;
