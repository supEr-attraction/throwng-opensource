import { MusicInfo } from "../../../types/mapType";
import { atom } from "recoil";

export const optionModalState = atom({
  key: "optionModalState", // atom을 식별하는데 필요한 고유한 문자열
  default: false,
});

export const reportModalState = atom({
  key: "reportModalState", // atom을 식별하는데 필요한 고유한 문자열
  default: false,
});

export const musicInfoState = atom<MusicInfo>({
  key: "musicInfoState", // atom을 식별하는데 필요한 고유한 문자열
  default: {
    address: "",
    albumImage: "",
    artist: "",
    content: "",
    itemImage: "",
    pickupStatus: false,
    throwId: 0,
    thrownDate: "",
    title: "",
  },
});
