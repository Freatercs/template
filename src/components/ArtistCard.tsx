import React from 'react';
import { Artist } from '../services/api';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const image = artist.image?.find(img => img.size === 'large')?.['#text'] || 
                artist.image?.find(img => img.size === 'medium')?.['#text'] ||
                'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

  return (
    <div className="artist-card">
      <div className="artist-image" style={{ backgroundImage: `url('${image}')` }}></div>
      <h3>{artist.name}</h3>
      <p>{artist.listeners ? parseInt(artist.listeners).toLocaleString() + ' слушателей' : ''}</p>
    </div>
  );
};

export default ArtistCard; 