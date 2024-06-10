import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing pages
import Home from './pages/Home';
import BookShelf from './pages/BookShelf';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/bookshelf" element={<BookShelf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
