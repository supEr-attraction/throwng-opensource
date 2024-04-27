export interface Location {
  lat: number;
  lng: number;
}

export interface Marker {
  itemId: number;
  latitude: number;
  longitude: number;
  albumImage: string;
  songTitle: string;
  artistName: string;
}

export interface MusicInfo {
  throwId: number;
  title: string;
  artist: string;
  albumImage: string;
  itemImage: string;
  content: string;
  thrownDate: string;
}
