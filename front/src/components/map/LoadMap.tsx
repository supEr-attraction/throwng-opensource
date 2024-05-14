import { GOOGLE_MAPS_LIBRARIES } from "@constants/map";
import { LoadScriptNext } from "@react-google-maps/api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  myAddressState,
  centerState,
  locationState,
  mapCenterAddressState,
  markersState,
  prevLocationState,
  zoomLevelState,
} from "@store/map/atoms";
import {
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { postAddress } from "@services/mapAPi";
import { Location } from "../../types/mapType";
import fetchMusic from "@/utils/map/fetchMusic";
import fetchDistance from "@/utils/map/fetchDistance";
import MapContainer from "@components/map/MapContainer";

interface Props {
  map: google.maps.Map | null;
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
  tilesLoaded: boolean;
  setTilesLoaded: Dispatch<SetStateAction<boolean>>;
}

const LoadMap = ({ map, setMap, tilesLoaded, setTilesLoaded }: Props) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [prevLocation, setPrevLocation] = useRecoilState(prevLocationState);
  const setZoomLevel = useSetRecoilState(zoomLevelState);
  const center = useRecoilValue(centerState);
  const setLocation = useSetRecoilState(locationState);
  const [myAddress, setMyAddress] = useRecoilState(myAddressState);
  const [markers, setMarkers] = useRecoilState(markersState);
  const [mapCenterAddress, setMapCenterAddress] = useRecoilState(
    mapCenterAddressState
  );
  const centerRef = useRef(center);
  const prevLocationRef = useRef(prevLocation);
  const initialLoadRef = useRef(initialLoad);

  const fetchAddress = useCallback(
    async (position: Location, type: string) => {
      try {
        const data = await postAddress(position);
        if (type === "myLocation") {
          if (myAddress.code !== data.code) {
            setMyAddress(data);
          }
        } else {
          if (mapCenterAddress.code !== data.code) {
            setMapCenterAddress(data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mapCenterAddress, myAddress]
  );

  const updateMyLocation = useCallback(
    (location: Location) => {
      setLocation(location);
      fetchAddress(location, "myLocation");
    },
    [fetchAddress]
  );

  useEffect(() => {
    centerRef.current = center;
  }, [center]);

  useEffect(() => {
    prevLocationRef.current = prevLocation;
  }, [prevLocation]);

  useEffect(() => {
    initialLoadRef.current = initialLoad;
  }, [initialLoad]);

  useEffect(() => {
    if (map) {
      const watchId = navigator.geolocation.watchPosition(
        ({ coords }) => {
          const currentLocation = {
            lat: coords.latitude,
            lng: coords.longitude,
          };

          if (initialLoadRef.current) {
            map.setZoom(15);
            setZoomLevel(15);
            map.setCenter(currentLocation);
            fetchMusic(true, currentLocation, markers, setMarkers);
            updateMyLocation(currentLocation);
            setPrevLocation(currentLocation);
            setInitialLoad(false);
          } else {
            const distance = fetchDistance(
              prevLocationRef.current,
              currentLocation
            );

            if (distance) {
              if (distance >= 50) {
                setPrevLocation(currentLocation);
                if (centerRef.current) {
                  fetchMusic(true, currentLocation, markers, setMarkers);
                }
              }

              updateMyLocation(currentLocation);

              if (centerRef.current) {
                map.panTo(currentLocation);
              }
            }
          }
        },
        (err) => {
          console.error("Error fetching location", err);
        },
        { enableHighAccuracy: true }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [map]);

  return (
    <LoadScriptNext
      id="google-map-script"
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
      language="ko"
      libraries={GOOGLE_MAPS_LIBRARIES}
      loadingElement={<></>}
    >
      <MapContainer
        map={map}
        setMap={setMap}
        tilesLoaded={tilesLoaded}
        setTilesLoaded={setTilesLoaded}
        fetchAddress={fetchAddress}
        initialLoad={initialLoad}
      />
    </LoadScriptNext>
  );
};

export default memo(LoadMap);
