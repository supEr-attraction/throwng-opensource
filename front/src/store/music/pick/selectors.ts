import { musicInfoState } from "@store/music/pick/atoms";
import { selector } from "recoil";

export const musicPickHeaderState = selector({
  key: "musicPickHeaderState",
  get: ({ get }) => {
    const { address, albumImage, previewUrl } = get(musicInfoState);
    return { address, albumImage, previewUrl };
  },
});

export const musicPickImageState = selector({
  key: "musicPickImageState",
  get: ({ get }) => {
    const { itemImage, albumImage } = get(musicInfoState);
    return { itemImage, albumImage };
  },
});

export const musicPickStatusState = selector({
  key: "musicPickStatusState",
  get: ({ get }) => {
    const { throwId, pickupStatus } = get(musicInfoState);
    return { throwId, pickupStatus };
  },
});

export const musicPickMusicInfoState = selector({
  key: "musicPickMusicInfoState",
  get: ({ get }) => {
    const { title, artist, otherPickedCount } = get(musicInfoState);
    return { title, artist, otherPickedCount };
  },
});

export const musicPickCommentState = selector({
  key: "musicPickCommentState",
  get: ({ get }) => {
    const { thrownDate, content } = get(musicInfoState);
    return { thrownDate, content };
  },
});
