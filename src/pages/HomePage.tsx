import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTopArtists, getTopTracks, searchArtists, searchTracks } from '../services/api';
import { Artist, Track } from '../services/api';
import ArtistCard from '../components/ArtistCard';
import TrackItem from '../components/TrackItem';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      loadData();
    }
  }, [searchParams]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [artistsData, tracksData] = await Promise.all([
        getTopArtists(),
        getTopTracks()
      ]);
      setArtists(artistsData);
      setTracks(tracksData);
      setError(null);
    } catch (err) {
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const [artistsData, tracksData] = await Promise.all([
        searchArtists(query),
        searchTracks(query)
      ]);
      setArtists(artistsData);
      setTracks(tracksData);
      setError(null);
    } catch (err) {
      setError('Failed to search. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <h1>Welcome to Music Explorer</h1>
        <section>
          <h2>Top Artists</h2>
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
        </section>
        <section>
          <h2>Top Tracks</h2>
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage; 