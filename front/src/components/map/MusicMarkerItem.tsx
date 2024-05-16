import { memo } from "react";
import { OverlayViewF } from "@react-google-maps/api";
import { useRecoilValue } from "recoil";
import { Marker } from "../../types/mapType";
import whitePin from "@assets/images/whitePin.webp";
import purplePin from "@assets/images/purplePin.webp";
import question from "@assets/images/question.webp";
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
          loading="lazy"
          decoding="async"
          className="marker"
        />
        <div className="cover-img">
          <img
            src={marker.secret ? question : marker.albumImage}
            alt="Custom Overlay"
            loading="lazy"
            decoding="async"
            className="album"
          />
        </div>
      </div>
    </OverlayViewF>
  );
};
export default memo(MusicMarkerItem);
