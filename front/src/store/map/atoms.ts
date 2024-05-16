import { recoilPersist } from "recoil-persist";
import { Address, Location, Marker } from "../../types/mapType";
import { atom } from "recoil";

const { persistAtom } = recoilPersist({
  key: "mapStorage",
  storage: sessionStorage,
});

export const markersState = atom<Marker[]>({
  key: "markersState",
  default: [],
});

export const radiusActiveIdState = atom<number | null>({
  key: "radiusActiveIdState",
  default: null,
});

export const couponUsageActiveIdState = atom<number | null>({
  key: "couponUsageActiveIdState",
  default: null,
});

export const myAddressState = atom<Address>({
  key: "myAddressState",
  default: { code: "", regionName: "" },
  effects_UNSTABLE: [persistAtom],
});

export const mapCenterAddressState = atom<Address>({
  key: "mapCenterAddressState",
  default: { code: "", regionName: "" },
});

export const locationState = atom<Location>({
  key: "locationState",
  default: { lat: 0, lng: 0 },
  effects_UNSTABLE: [persistAtom],
});

export const prevLocationState = atom<Location>({
  key: "prevLocationState",
  default: { lat: 0, lng: 0 },
});

export const centerState = atom({
  key: "centerState",
  default: true,
});

export const zoomLevelState = atom({
  key: "zoomLevelState",
  default: 0,
});

export const prevPathState = atom({
  key: "prevPathState",
  default: "",
});
