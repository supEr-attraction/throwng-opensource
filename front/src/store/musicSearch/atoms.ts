import { atom } from "recoil";

export const inputSearchKeyWord = atom<string>({
  key: 'inputSearchKeyWord',
  default: '',
});

export const searchedWords = atom<{id:number, title:string}[]>({
  key: 'searchedWords',
  default: [],
})