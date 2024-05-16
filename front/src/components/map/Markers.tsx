import { memo } from "react";
import MyLocation from "./MyLocation";
import MapClusterer from "./MapClusterer";

const Markers = () => {
  return (
    <>
      <MyLocation />
      <MapClusterer />
    </>
  );
};

export default memo(Markers);
