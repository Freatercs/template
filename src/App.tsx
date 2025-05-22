import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TopArtistsPage from './pages/TopArtistsPage';
import TopTracksPage from './pages/TopTracksPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists" element={<TopArtistsPage />} />
        <Route path="/tracks" element={<TopTracksPage />} />
      </Routes>
    </Router>
  );
};

export default App;
