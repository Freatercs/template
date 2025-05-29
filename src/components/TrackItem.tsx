import React from 'react';
import { Track } from '../services/api';

interface TrackItemProps {
  track: Track;
  index: number;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, index }) => {
  const image = track.image?.find(img => img.size === 'large')?.['#text'] || 
                track.image?.find(img => img.size === 'medium')?.['#text'] ||
                'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

  return (
    <div className="track-item">
      <div className="track-number">{index + 1}</div>
      <div className="track-image" style={{ backgroundImage: `url('${image}')` }}></div>
      <div className="track-info">
        <h3>{track.name}</h3>
        <p>{track.artist.name}</p>
      </div>
      <div className="track-plays">
        {track.listeners ? parseInt(track.listeners).toLocaleString() + ' прослушиваний' : ''}
      </div>
    </div>
  );
};

export default TrackItem; 