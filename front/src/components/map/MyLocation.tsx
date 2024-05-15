import { memo, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { locationState } from "@store/map/atoms";
import { CircleF, MarkerF } from "@react-google-maps/api";
import { CIRCLE_OPTIONS } from "@constants/map";
import markerImg from "@assets/images/usermarker.webp";

const MyLocation = () => {
  const location = useRecoilValue(locationState);

  const markerIcon = useMemo(
    () => ({
      url: markerImg,
      scaledSize: new window.google.maps.Size(60, 60),
      anchor: new window.google.maps.Point(30, 30),
    }),
    []
  );

  if (location.lat === 0 || location.lng === 0) {
    return null;
  }

  return (
    <>
      <CircleF center={location} options={CIRCLE_OPTIONS} />
      <MarkerF position={location} icon={markerIcon} zIndex={0} />
    </>
  );
};

export default memo(MyLocation);
