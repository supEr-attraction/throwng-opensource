import { MusicInfo } from "../../../types/mapType";
import { atom } from "recoil";

export const optionModalState = atom({
  key: "optionModalState",
  default: false,
});

export const reportModalState = atom({
  key: "reportModalState",
  default: false,
});

export const musicInfoState = atom<MusicInfo>({
  key: "musicInfoState",
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
    previewUrl: "",
    otherPickedCount: 0,
  },
});
