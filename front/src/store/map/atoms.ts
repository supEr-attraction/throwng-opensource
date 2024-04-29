import { Location, Marker, MusicInfo } from "../../types/mapType";
import { atom } from "recoil";

export const markersState = atom<Marker[]>({
  key: "markersState", // atom을 식별하는데 필요한 고유한 문자열
  default: [],
});

export const musicInfoState = atom<MusicInfo>({
  key: "musicInfoState", // atom을 식별하는데 필요한 고유한 문자열
  default: {
    throwId: 0,
    title: "",
    artist: "",
    albumImage: "",
    itemImage: "",
    content: "",
    thrownDate: "",
  }, // 초기값을 설정해준다.
});

export const activeMarkerState = atom<number | null>({
  key: "activeMarkerState", // atom을 식별하는데 필요한 고유한 문자열
  default: null, // 초기값을 설정해준다.
});

export const swiperState = atom<string | null>({
  key: "swiperState", // atom을 식별하는데 필요한 고유한 문자열
  default: null, // 초기값을 설정해준다.
});

export const addressState = atom({
  key: "addressState", // atom을 식별하는데 필요한 고유한 문자열
  default: "", // 초기값을 설정해준다.
});

export const locationState = atom<Location>({
  key: "locationState", // atom을 식별하는데 필요한 고유한 문자열
  default: { lat: 0, lng: 0 }, // 초기값을 설정해준다.
});

export const prevLocationState = atom<Location>({
  key: "prevLocationState", // atom을 식별하는데 필요한 고유한 문자열
  default: { lat: 0, lng: 0 }, // 초기값을 설정해준다.
});

export const centerState = atom({
  key: "centerState",
  default: false,
});
