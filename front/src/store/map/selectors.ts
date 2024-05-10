import fetchDistance from "@/utils/map/fetchDistance";
import {
  activeMarkerState,
  locationState,
  markersState,
} from "@store/map/atoms";
import { selector, selectorFamily } from "recoil";

export const markerRadiusState = selector({
  key: "markerRadiusState",
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

export const initialSlideState = selector({
  key: "initialSlideState",
  get: ({ get }) => {
    const markers = get(markerRadiusState);
    const active = get(activeMarkerState);

    return markers.findIndex((marker) => marker.itemId === active);
  },
});

export const isActiveState = selectorFamily({
  key: "isActiveState",
  get:
    (id) =>
    ({ get }) => {
      const active = get(activeMarkerState);

      return active === id;
    },
});
