export interface Content {
  playlistId: number;
  youtubeId: string;
  title: string;
  artist: string;
  albumImage: string;
  modifiedAt: string;
  previewUrl: string | null;
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
  previewUrl: string | null;
}

export interface DropSong extends Omit<SongInfo, "youtubeId" | "albumImage"> {
  albumImageUrl: string;
  code: string;
  comment: string;
  imageUrl: string | null;
  latitude: number;
  location: string;
  longitude: number;
  previewUrl: string | null;
}

export interface SongHistory extends SongInfo {
  comment: string;
  location: string;
}

export interface SearchedWordsList {
  id: number;
  title: string;
}

export interface MyHistory extends Omit<SongHistory, "youtubeId"> {
  myThrowId?: number;
  myPickId?: number;
  dropDate?: string;
  pickDate?: string;
  throwId?: string;
  otherPickedCount?: number;
}

export interface SongItem {
  playlistId?: number;
  youtubeId?: string;
  title?: string;
  artist?: string;
  albumImage?: string;
  modifiedAt?: string;
  previewUrl?: string | null;
  myThrowId?: number;
  myPickId?: number;
  dropDate?: string;
  pickDate?: string;
  throwId?: string;
  otherPickedCount?: number;
  comment?: string;
  location?: string;
}
