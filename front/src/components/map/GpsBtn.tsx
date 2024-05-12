import { centerState, locationState, zoomLevelState } from "@store/map/atoms";
import { memo, useCallback } from "react";
import { MdMyLocation } from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "@styles/map/GpsBtn.scss";

interface Props {
  map: google.maps.Map | null;
}

const GpsBtn = ({ map }: Props) => {
  const setZoomLevel = useSetRecoilState(zoomLevelState);
  const location = useRecoilValue(locationState);
  const [center, setCenter] = useRecoilState(centerState);

  const returnMyLocation = useCallback(() => {
    if (map && !center) {
      const zoom = map.getZoom() ?? 15;
      if (zoom < 15) {
        map.setZoom(15);
        setZoomLevel(15);
      }
      map.panTo(location);
      setCenter(true);
    }
  }, [map, location, center]);

  return (
    <div className="GpsBtn" onClick={returnMyLocation}>
      <MdMyLocation className={center ? "centered" : "not-centered"} />
    </div>
  );
};

export default memo(GpsBtn);
