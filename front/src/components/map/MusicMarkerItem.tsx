import { memo, useCallback } from "react";
import { OverlayViewF } from "@react-google-maps/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMarkerState, locationState } from "@store/map/atoms";
import { Marker } from "../../types/mapType";
import { toastMsg } from "@/utils/toastMsg";
import getDistance from "@/utils/map/fetchDistance";
import whitePin from "@assets/images/whitePin.webp";
import purplePin from "@assets/images/purplePin.webp";

interface Props {
  marker: Marker;
}

const MusicMarkerItem = ({ marker }: Props) => {
  const [activeMarkerId, setActiveMarkerId] = useRecoilState(activeMarkerState);
  const location = useRecoilValue(locationState);

  const isActive = marker.itemId === activeMarkerId;

  const handleMarkerClick = useCallback(() => {
    const distance = getDistance(
      { lat: marker.latitude, lng: marker.longitude },
      location
    );

    if (distance <= 600) {
      setActiveMarkerId(marker.itemId);
    } else {
      toastMsg("반경 밖 음악을 듣고 싶다면 위치를 이동해 보세요!");
      setActiveMarkerId(null);
    }
  }, [marker, location]);

  return (
    <OverlayViewF
      key={marker.itemId}
      position={{ lat: marker.latitude, lng: marker.longitude }}
      mapPaneName="overlayMouseTarget"
      zIndex={1}
      getPixelPositionOffset={(width, height) => ({
        x: -width / 2,
        y: -height / 1.2,
      })}
    >
      <div className="MusicMarkerItem" onClick={handleMarkerClick}>
        <img
          src={isActive ? purplePin : whitePin}
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

export default memo(MusicMarkerItem);
