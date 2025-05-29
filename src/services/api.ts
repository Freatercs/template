const API_KEY = 'b2ce21b3d5ee14e3eaa2d5f3714a54e3';
const API_URL = 'https://ws.audioscrobbler.com/2.0/';

interface Artist {
  name: string;
  listeners: string;
  image: Array<{ size: string; '#text': string }>;
}

interface Track {
  name: string;
  artist: { name: string };
  listeners: string;
  image: Array<{ size: string; '#text': string }>;
}

interface ApiResponse<T> {
  error?: number;
  message?: string;
  artists?: { artist: Artist[] };
  tracks?: { track: Track[] };
  results?: {
    artistmatches?: { artist: Artist[] };
    trackmatches?: { track: Track[] };
  };
}

async function fetchLastFmData<T>(params: Record<string, string | number>): Promise<T> {
  const queryParams = new URLSearchParams({
    ...params,
    api_key: API_KEY,
    format: 'json'
  });

  try {
    const response = await fetch(`${API_URL}?${queryParams}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as ApiResponse<T>;
    if (data.error) {
      throw new Error(`API error: ${data.message}`);
    }
    return data as T;
  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    throw error;
  }
}

export async function getTopArtists(limit: number = 12): Promise<Artist[]> {
  const data = await fetchLastFmData<{ artists: { artist: Artist[] } }>({
    method: 'chart.gettopartists',
    limit: limit
  });
  return data.artists.artist;
}

export async function getTopTracks(limit: number = 12): Promise<Track[]> {
  const data = await fetchLastFmData<{ tracks: { track: Track[] } }>({
    method: 'chart.gettoptracks',
    limit: limit
  });
  return data.tracks.track;
}

export async function searchArtists(query: string, limit: number = 12): Promise<Artist[]> {
  const data = await fetchLastFmData<{ results: { artistmatches: { artist: Artist[] } } }>({
    method: 'artist.search',
    artist: query,
    limit: limit
  });
  return data.results.artistmatches.artist;
}

export async function searchTracks(query: string, limit: number = 12): Promise<Track[]> {
  const data = await fetchLastFmData<{ results: { trackmatches: { track: Track[] } } }>({
    method: 'track.search',
    track: query,
    limit: limit
  });
  return data.results.trackmatches.track;
}

export type { Artist, Track }; 