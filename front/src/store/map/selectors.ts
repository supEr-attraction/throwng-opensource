import fetchDistance from "@/utils/map/fetchDistance";
import { locationState, markersState } from "@store/map/atoms";
import { selector } from "recoil";

export const markerRadiusState = selector({
  key: "markerRadiusState", // atom의 key와 동일하며 프로젝트 전체에서 고유한 문자열
  get: ({ get }) => {
    const markers = get(markersState);
    const location = get(locationState);

    return markers.filter(
      (marker) =>
        fetchDistance(
          { lat: marker.latitude, lng: marker.longitude },
          location
        ) <= 600
    );
  },
});
