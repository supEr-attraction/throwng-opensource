import { atom } from "recoil";

export const throwngFilterModal = atom<boolean>({
  key: "throwngFilterModal",
  default: false,
});

export const throwngFilter = atom<string>({
  key: "throwngFilter",
  default: '오늘',
});