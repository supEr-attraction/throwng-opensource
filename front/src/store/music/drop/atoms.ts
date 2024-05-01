import { atom } from "recoil";
import { Song } from "./../../../types/songType";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "musicDropInfoStorage", // 고유한 key 값
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
  },
  effects_UNSTABLE: [persistAtom],
});
