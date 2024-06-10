import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function BookShelf() {
    const [shelf, setShelf] = useState([]);

    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem("bookshelf") || "[]");
        setShelf(savedBooks);
    }, []);

    const removeFromShelf = (bookKey) => {
        const updatedShelf = shelf.filter((book) => book.key !== bookKey);
        setShelf(updatedShelf);
        localStorage.setItem("bookshelf", JSON.stringify(updatedShelf));
        toast('Book removed form the Shelf',
            {
                icon: '🫡😲',
                style: {
                    borderRadius: '10px',
                    background: '#fff',
                    color: '#333',
                },
            }
        );
    };

    return (
        <div>
            <div className="search">
                <span>My Bookshelf</span>
            </div>
            <div className="display">
                {shelf.length === 0 ? (
                    <p>No books in your shelf.</p>
                ) : (
                    shelf.map((book) => (
                        <div key={book.key} className="book-card">
                            <h3>Book Title: {book.title}</h3>
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
