import { Content } from "../../types/songType";
import { atom } from "recoil";

export const speedListenModal = atom<number | null>({
  key: "speedListenModal",
  default: null,
});

export const detailModal = atom<number | null>({
  key: "detailModal",
  default: null,
});

export const myPlayList = atom<Content[]>({
  key: "myPlayList",
  default: [],
});

export const scrollSongIndex = atom<string>({
  key: 'scrollSongIndex',
  default: '',
});