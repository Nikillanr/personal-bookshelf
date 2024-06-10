import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  let navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim().length > 1) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 1) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${trimmedQuery}&limit=10&page=1`
        );
        const data = await response.json();
        setBooks(data.docs);
      } catch (error) {
        toast.error("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  const addToBookShelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];

    const isBookAlreadyAdded = bookshelf.some(
      (savedBook) => savedBook.key === book.key
    );

    if (!isBookAlreadyAdded) {
      bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
      toast.success("Book added to the Shelf", {
        icon: "👍✅",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
    } else {
      toast("Already in the BookShelf", {
        icon: "😶‍🌫️👀",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
    }
  };

  const goToBookShelf = () => {
    navigate("/bookshelf");
  };

  return (
    <div className="booksearch">
      <div className="search">
        <span>Search by book name:</span>
        <input
          type="search"
          className="b-search"
          value={query}
          onChange={handleInputChange}
        />
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="results">
          {books.length === 0 && <p>Search for any book that you want!</p>}
          {books.map((book) => (
            <div key={book.key} className="book-card">
              <h3>{book.title}</h3>
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={`${book.title} cover`}
                  className="book-cover"
                />
              ) : (
                <p>No cover pic available</p>
              )}
              <h6>Edition count: {book.edition_count}</h6>
              <button onClick={() => addToBookShelf(book)} className="b-card">
                Add to Bookshelf
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="shelf">
        <input
          type="button"
          value="My Bookshelf"
          className="b-shelf"
          onClick={goToBookShelf}
        />
      </div>
    </div>
  );
};

export default Home;
