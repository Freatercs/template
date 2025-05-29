import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2023 Last.fm Clone. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 