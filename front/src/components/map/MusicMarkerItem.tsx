import { memo } from "react";
import { OverlayViewF } from "@react-google-maps/api";
import { useRecoilValue } from "recoil";
import { Marker } from "../../types/mapType";
import whitePin from "@assets/images/whitePin.webp";
import purplePin from "@assets/images/purplePin.webp";
import {
  isActiveOutsideState,
  isActiveInsideState,
} from "@store/map/selectors";
import useHandleMarkerClick from "@hooks/map/useHandleMarkerClick";

interface Props {
  marker: Marker;
}

const MusicMarkerItem = ({ marker }: Props) => {
  const isActiveInside = useRecoilValue(isActiveInsideState(marker.itemId));
  const isActiveOutside = useRecoilValue(isActiveOutsideState(marker.itemId));

  const { handleMarkerClick } = useHandleMarkerClick();

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
      <div
        className="MusicMarkerItem"
        onClick={() => handleMarkerClick(marker)}
      >
        <img
          src={isActiveInside || isActiveOutside ? purplePin : whitePin}
          alt="Custom Overlay"
          style={{ width: "30px", height: "35px" }}
          loading="lazy"
          decoding="async"
        />
        <div className="cover-img">
          <img
            src={marker.albumImage}
            alt="Custom Overlay"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </OverlayViewF>
  );
};

// export default memo(MusicMarkerItem, (prevProps, nextProps) => {
//   console.log(prevProps.marker.itemId);
//   console.log(nextProps.marker.itemId);
//   return prevProps.marker.itemId === nextProps.marker.itemId;
// });
export default memo(MusicMarkerItem);
