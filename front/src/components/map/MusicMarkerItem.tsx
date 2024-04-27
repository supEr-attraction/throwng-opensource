import { OverlayViewF } from "@react-google-maps/api";
import whitePin from "@assets/images/whitePin.webp";
import purplePin from "@assets/images/purplePin.webp";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMarkerState, locationState } from "@store/map/atoms";
import { toastMsg } from "@/utils/toastMsg";
import { Location, Marker } from "../../types/mapType";
import getDistance from "@/utils/map/getDistance";

interface Props {
  marker: Marker;
}

interface MarkerPosition {
  id: number;
  position: Location;
}

const MusicMarkerItem = ({ marker }: Props) => {
  const [activeMarkerId, setActiveMarkerId] = useRecoilState(activeMarkerState);
  const location = useRecoilValue(locationState);

  const outsideCircleClick = () => {
    toastMsg("반경 밖 음악을 듣고 싶다면 위치를 이동해 보세요!");
    setActiveMarkerId(null);
  };

  const getOnClickFunction = (marker: MarkerPosition) => {
    const distance = getDistance(marker.position, location);

    return distance <= 600
      ? setActiveMarkerId(marker.id) // handleMarkerClick(marker.id)
      : outsideCircleClick();
  };

  return (
    <OverlayViewF
      key={marker.itemId}
      position={{ lat: marker.latitude, lng: marker.longitude }}
      mapPaneName="overlayMouseTarget"
      getPixelPositionOffset={(width, height) => ({
        x: -width / 2,
        y: -height / 1.2,
      })}
    >
      <div
        onClick={() => {
          getOnClickFunction({
            id: marker.itemId,
            position: { lat: marker.latitude, lng: marker.longitude },
          });
        }}
      >
        <img
          src={marker.itemId === activeMarkerId ? purplePin : whitePin}
          alt="Custom Overlay"
          style={{ width: "30px", height: "35px" }}
        />
        <div className="cover-img">
          <img src={marker.albumImage} alt="Custom Overlay" />
        </div>
      </div>
    </OverlayViewF>
  );
};

export default MusicMarkerItem;
