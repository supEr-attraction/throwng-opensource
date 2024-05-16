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
  innerDistance: boolean;
}

export interface MusicInfo {
  address: string;
  albumImage: string;
  artist: string;
  content: string;
  itemImage: string;
  pickupStatus: boolean;
  throwId: number;
  thrownDate: string;
  title: string;
  previewUrl: string | null;
  otherPickedCount: number;
}

export interface Address {
  code: string;
  regionName: string;
}

export interface Address {
  code: string;
  regionName: string;
}
