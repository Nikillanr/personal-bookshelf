import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {

    let navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);

    const handleSearch = async (e) => {
        setQuery(e.target.value);

        if (query.length > 1) {
            const response = await fetch(
                `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
            );
            const data = await response.json();
            setBooks(data.docs);
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
            toast('Book added in the Shelf',
                {
                    icon: '👍✅',
                    style: {
                        borderRadius: '10px',
                        background: '#fff',
                        color: '#333',
                    },
                }
            );
        } else {
            toast('Already in the BookShelf',
                {
                    icon: '😶‍🌫️👀',
                    style: {
                        borderRadius: '10px',
                        background: '#fff',
                        color: '#333',
                    },
                }
            );
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
                    onChange={handleSearch}
                />
            </div>
            <div className="results">
                {
                    books.length === 0 && (
                        <p>Please Search</p>
                    )
                }
                {books.map((book) => (
                    <div key={book.key} className="book-card">
                        <h3>{book.title}</h3>
                        <h6>{book.edition_count}</h6>
                        <button onClick={() => addToBookShelf(book)} className="b-card">
                            Add to Bookshelf
                        </button>
                    </div>
                ))}
            </div>
            <div className="shelf">
                <input
                    type="button"
                    value="My Bookshelf"
                    className="b-shelf"
                    onClick={goToBookShelf}
                />
            </div>
        </div>
    )
}

export default Home