import { memo } from "react";
import { useRecoilValue } from "recoil";
import {
  couponUsageActiveIdState,
  radiusActiveIdState,
} from "@store/map/atoms";
import MapSwiper from "./MapSwiper";
import Navbar from "@components/Navbar";

const MapBottom = () => {
  const radiusActiveId = useRecoilValue(radiusActiveIdState);
  const couponUsageActiverId = useRecoilValue(couponUsageActiveIdState);

  return radiusActiveId || couponUsageActiverId ? <MapSwiper /> : <Navbar />;
};

export default memo(MapBottom);
