interface SongInfo {
  id: number;
  image: string;
  artist: string;
  title: string;
}

export interface Song extends SongInfo {
  playtime: string;
}

export interface SongHistory extends SongInfo {
  comment?: string;
  date: string;
  location: string
}

export interface SearchedWordsList {
  id: number,
  title: string
}
