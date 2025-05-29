import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTopTracks, searchTracks } from '../services/api';
import { Track } from '../services/api';
import TrackItem from '../components/TrackItem';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TopTracksPage: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      loadTracks();
    }
  }, [searchParams]);

  const loadTracks = async () => {
    try {
      setLoading(true);
      const data = await getTopTracks();
      setTracks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tracks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await searchTracks(query);
      setTracks(data);
      setError(null);
    } catch (err) {
      setError('Failed to search tracks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <h1>Top Tracks</h1>
        <div className="tracks-list">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : tracks.length === 0 ? (
            <div className="no-results">No tracks found</div>
          ) : (
            tracks.map((track, index) => (
              <TrackItem key={track.name} track={track} index={index} />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopTracksPage; 