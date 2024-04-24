import getDistance from "@/utils/map/getDistance";
import { locationState, markersState } from "@store/map/atoms";
import { selector } from "recoil";

// interface Marker {
//   id: number;
//   position: { lat: number; lng: number };
//   music: {
//     img: string;
//     title: string;
//     singer: string;
//   };
// }

export const markerRadiusState = selector({
  key: "markerRadiusState", // atom의 key와 동일하며 프로젝트 전체에서 고유한 문자열
  get: ({ get }) => {
    const markers = get(markersState);
    const location = get(locationState);
    // const markerRadius = markers.filter((marker) => {
    //   const distance = getDistance(marker);
    //   return distance <= 600;
    // });
    // return markerRadius;
    return markers.filter((marker) => getDistance(marker, location) <= 600);
  },
});
