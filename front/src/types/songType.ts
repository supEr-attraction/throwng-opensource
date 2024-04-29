export interface Content {
  playlistId: number;
  youtubeId: string;
  title: string;
  artist: string;
  albumImage: string;
  modifiedAt: string;
}

export interface Pageable {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ResponseData {
  content: Content[];
  pageable: Pageable;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface SongInfo {
  youtubeId: string;
  albumImage: string;
  artist: string;
  title: string;
}

export interface Song extends SongInfo {
  playTime: string;
}

export interface DropSong extends Omit<SongInfo, 'youtubeId' | 'albumImage'> {
  longitude: number;
  latitude: number;
  location: string;
  imageUrl: File | null;
  comment: string;
  albumImageUrl: string;
}

export interface SongHistory extends SongInfo {
  comment: string;
  dropDate: string;
  location: string;
}

export interface SearchedWordsList {
  id: number;
  title: string;
}

export interface MyThrowHistory extends Omit<SongHistory, 'youtubeId'> {
  myThrowId: number;
}

export interface MyPickHistory extends Omit<SongHistory, 'youtubeId'> {
  myPickId: number;
}
