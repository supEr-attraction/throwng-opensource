import fetchDistance from "@/utils/map/fetchDistance";
import {
  radiusActiveIdState,
  couponUsageActiveIdState,
  locationState,
  markersState,
} from "@store/map/atoms";
import { selector, selectorFamily } from "recoil";

export const insideRadiusMarkerState = selector({
  key: "insideRadiusMarkerState",
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

export const outsideRadiusMarkerState = selector({
  key: "outsideRadiusMarkerState",
  get: ({ get }) => {
    const markers = get(markersState);
    const couponUsageActiveId = get(couponUsageActiveIdState);

    return markers.filter((marker) => marker.itemId === couponUsageActiveId);
  },
});

export const initialSlideState = selector({
  key: "initialSlideState",
  get: ({ get }) => {
    const markers = get(insideRadiusMarkerState);
    const activeId = get(radiusActiveIdState);

    return markers.findIndex((marker) => marker.itemId === activeId);
  },
});

export const isActiveInsideState = selectorFamily({
  key: "isActiveInsideState",
  get:
    (id) =>
    ({ get }) => {
      const activeId = get(radiusActiveIdState);

      return activeId === id;
    },
});

export const isActiveOutsideState = selectorFamily({
  key: "isActiveOutsideState",
  get:
    (id) =>
    ({ get }) => {
      const activeId = get(couponUsageActiveIdState);

      return activeId === id;
    },
});
