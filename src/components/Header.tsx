import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const currentPath = location.pathname;
      if (currentPath === '/artists') {
        navigate(`/artists?search=${encodeURIComponent(searchQuery)}`);
      } else if (currentPath === '/tracks') {
        navigate(`/tracks?search=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate(`/artists?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">last.fm</Link>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search artists, tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button type="submit" className="search-button">
              <svg className="search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>
        </div>
        <nav className="nav">
          <div className="dropdown">
            <button className="dropdown-button">Music</button>
            <ul className="dropdown-menu">
              <li><Link to="/artists">Топ исполнителей</Link></li>
              <li><Link to="/tracks">Топ треков</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 