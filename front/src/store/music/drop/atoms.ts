import { atom } from "recoil";
import { Song } from './../../../types/songType';

export const selectMusic = atom<Song>({
  key: "selectMusic",
  default: {
    youtubeId: "",
    albumImage: "",
    artist: "",
    title: "",
    playTime: ""
  },
});
