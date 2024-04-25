import { atom } from "recoil";

export const speedListenModal = atom<number | null>({
  key: "speedListenModal",
  default: null,
});

export const detailModal = atom<number | null>({
  key: "detailModal",
  default: null,
});
