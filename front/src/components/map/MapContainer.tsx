import {
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSetRecoilState } from "recoil";
import { centerState, zoomLevelState } from "@store/map/atoms";
import { GoogleMap } from "@react-google-maps/api";
import { CONTAINER_STYLE, MAP_OPTIONS } from "@constants/map";
import useChangeCenter from "@hooks/map/useChangeCenter";
import Markers from "./Markers";
import { toastMsg } from "@/utils/toastMsg";

interface Props {
  map: google.maps.Map | null;
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
  initialLoad: boolean;
  setInitialLoad: Dispatch<SetStateAction<boolean>>;
}

const MapContainer = ({ map, setMap, initialLoad, setInitialLoad }: Props) => {
  const setCenter = useSetRecoilState(centerState);
  const setZoomLevel = useSetRecoilState(zoomLevelState);
  const [mapKey, setMapKey] = useState(0);
  const [loadAttempts, setLoadAttempts] = useState(0);

  const { changeCenter } = useChangeCenter();

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const onChanged = useCallback(() => {
    if (!initialLoad) {
      setCenter((prev) => {
        if (!prev) {
          return prev;
        } else {
          return false;
        }
      });
    }
  }, [initialLoad]);

  const onZoomChanged = useCallback(() => {
    onChanged();
    if (map) {
      const zoom = map.getZoom()!;
      setZoomLevel(zoom);
    }
  }, [onChanged, map]);

  const onTilesLoaded = useCallback(() => {
    setLoadAttempts(-1);
    setInitialLoad((prev) => {
      if (prev) {
        return !prev;
      }

      return prev;
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadAttempts !== -1) {
        if (loadAttempts >= 4) {
          toastMsg("새로고침을 해주세요");
        } else {
          setMapKey((prevKey) => prevKey + 1);
          setLoadAttempts((prev) => prev + 1);
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [loadAttempts]);

  return (
    <GoogleMap
      key={mapKey}
      // onHeadingChanged={}
      mapContainerStyle={CONTAINER_STYLE}
      zoom={15}
      onTilesLoaded={onTilesLoaded}
      options={MAP_OPTIONS}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onDragStart={onChanged}
      onZoomChanged={onZoomChanged}
      onIdle={() => changeCenter(map, initialLoad)}
    >
      {!initialLoad && <Markers />}
    </GoogleMap>
  );
};

export default memo(MapContainer);
