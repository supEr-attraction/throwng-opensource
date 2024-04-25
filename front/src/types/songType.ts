export interface SongInfo {
  youtubeId: string;
  albumImage: string;
  artist: string;
  title: string;
}

export interface Song extends SongInfo {
  playTime: string;
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
