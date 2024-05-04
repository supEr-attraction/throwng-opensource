import { atom } from "recoil";
import { Song } from "./../../../types/songType";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "musicDropInfoStorage",
  storage: sessionStorage,
});

export const selectMusic = atom<Song>({
  key: "selectMusic",
  default: {
    youtubeId: "",
    albumImage: "",
    artist: "",
    title: "",
    playTime: "",
    previewUrl: ""
  },
  effects_UNSTABLE: [persistAtom],
});
