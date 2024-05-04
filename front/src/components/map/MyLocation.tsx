import { CIRCLE_OPTIONS } from "@constants/map";
import { CircleF, MarkerF } from "@react-google-maps/api";
import { locationState } from "@store/map/atoms";
import { useRecoilValue } from "recoil";
import marker from "@assets/images/usermarker.webp";

const MyLocation = () => {
  const location = useRecoilValue(locationState);

  return (
    <>
      <CircleF center={location} options={CIRCLE_OPTIONS} />
      <MarkerF
        position={location}
        icon={{
          url: marker,
          scaledSize: new window.google.maps.Size(60, 60),
          anchor: new window.google.maps.Point(30, 30),
        }}
        zIndex={0}
      />
    </>
  );
};

export default MyLocation;
