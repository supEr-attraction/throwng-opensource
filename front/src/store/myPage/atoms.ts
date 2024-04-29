import { MyPickHistory, MyThrowHistory } from "../../types/songType";
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
  default: '오늘',
});

export const myThrowHistoryList = atom<MyThrowHistory[]>({
  key: "myThrowHistoryList",
  default: [],
})

export const myPickHistoryList = atom<MyPickHistory[]>({
  key: "myPickHistoryList",
  default: [],
})