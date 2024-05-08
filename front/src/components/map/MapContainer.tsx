import { Dispatch, SetStateAction, memo, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  centerState,
  locationState,
  markersState,
  zoomLevelState,
} from "@store/map/atoms";
import updateMapCenter from "@/utils/map/updateMapCenter";
import MapClusterer from "@components/map/MapClusterer";
import MyLocation from "@components/map/MyLocation";
import { CONTAINER_STYLE, MAP_OPTIONS } from "@constants/map";
import { GoogleMap } from "@react-google-maps/api";
import { Location } from "../../types/mapType";
import fetchMusic from "@/utils/map/fetchMusic";

interface Props {
  map: google.maps.Map | null;
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
  tilesLoaded: boolean;
  setTilesLoaded: Dispatch<SetStateAction<boolean>>;
  fetchAddress: (position: Location, type: string) => void;
  initialLoad: boolean;
}

const MapContainer = ({
  map,
  setMap,
  tilesLoaded,
  setTilesLoaded,
  fetchAddress,
  initialLoad,
}: Props) => {
  const setZoomLevel = useSetRecoilState(zoomLevelState);
  const [center, setCenter] = useRecoilState(centerState);
  const [markers, setMarkers] = useRecoilState(markersState);
  const location = useRecoilValue(locationState);

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);

  const onUnmount = useCallback(() => setMap(null), []);

  const onTilesLoaded = useCallback(() => {
    if (!tilesLoaded) {
      setTilesLoaded(true);
    }
  }, [tilesLoaded]);

  const onChanged = () => {
    if (!initialLoad && center) {
      setCenter(false);
    }
  };

  const onZoomChanged = () => {
    onChanged();
    if (map) {
      const zoom = map.getZoom()!;
      setZoomLevel(zoom);
    }
  };

  const changeCenter = useCallback(() => {
    if (map) {
      if (!center) {
        updateMapCenter(map, fetchAddress, markers, setMarkers);
      } else {
        fetchMusic(true, location, markers, setMarkers);
      }
    }
  }, [map, center, markers, location, fetchAddress]);

  return (
    <GoogleMap
      mapContainerStyle={CONTAINER_STYLE}
      onTilesLoaded={onTilesLoaded}
      options={MAP_OPTIONS}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onDragStart={onChanged}
      onZoomChanged={onZoomChanged}
      onIdle={changeCenter}
    >
      {tilesLoaded && (
        <>
          <MyLocation />
          <MapClusterer />
        </>
      )}
    </GoogleMap>
  );
};

export default memo(MapContainer);
