import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTopArtists, searchArtists } from '../services/api';
import { Artist } from '../services/api';
import ArtistCard from '../components/ArtistCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TopArtistsPage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      loadArtists();
    }
  }, [searchParams]);

  const loadArtists = async () => {
    try {
      setLoading(true);
      const data = await getTopArtists();
      setArtists(data);
      setError(null);
    } catch (err) {
      setError('Failed to load artists. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await searchArtists(query);
      setArtists(data);
      setError(null);
    } catch (err) {
      setError('Failed to search artists. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <h1>Top Artists</h1>
        <div className="artists-grid">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : artists.length === 0 ? (
            <div className="no-results">No artists found</div>
          ) : (
            artists.map((artist) => (
              <ArtistCard key={artist.name} artist={artist} />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopArtistsPage; 