import { MyHistory } from "../../types/songType";
import { atom } from "recoil";

export const throwngFilterModal = atom<boolean>({
  key: "throwngFilterModal",
  default: false,
});

export const myNickName = atom<string>({
  key: "myNickName",
  default: '',
});

export const throwngFilter = atom<string>({
  key: "throwngFilter",
  default: '전체',
});

export const pageIdx = atom<boolean>({
  key: "pageIdx",
  default: false,
});

export const myThrowHistoryList = atom<MyHistory[]>({
  key: "myThrowHistoryList",
  default: [],
})

export const myPickHistoryList = atom<MyHistory[]>({
  key: "myPickHistoryList",
  default: [],
})