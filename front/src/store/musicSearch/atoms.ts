import { atom } from "recoil";
import { Song } from "../../types/songType";

export const inputSearchKeyWord = atom<string>({
  key: 'inputSearchKeyWord',
  default: '',
});

export const searchedWords = atom<{id:number, title:string}[]>({
  key: 'searchedWords',
  default: [],
})

export const searchResultsState = atom<Song[]>({
  key: 'searchResultsState',
  default: [],
});

export const musicDropImage = atom<string>({
  key: 'musicDropImage',
  default: '',
})

export const userImageURL = atom<string|null>({
  key: 'userImageURL',
  default: null,
})