import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  centerState,
  prevLocationState,
  zoomLevelState,
} from "@store/map/atoms";
import fetchDistance from "@/utils/map/fetchDistance";
import useFetchMusic from "@hooks/map/useFetchMusic";
import useUpdateMyLocation from "@hooks/map/useUpdateMyLocation";

const useLocationWatcher = (
  map: google.maps.Map | null,
  initialLoad: boolean
) => {
  const [prevLocation, setPrevLocation] = useRecoilState(prevLocationState);
  const [center, setCenter] = useRecoilState(centerState);
  const setZoomLevel = useSetRecoilState(zoomLevelState);

  const centerRef = useRef(center);
  const prevLocationRef = useRef(prevLocation);
  const initialLoadRef = useRef(initialLoad);

  const { fetchMusicc } = useFetchMusic();
  const { updateMyLocation } = useUpdateMyLocation();

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
            setZoomLevel(15);
            map.setCenter(currentLocation);
            setCenter(true);
            fetchMusicc(true, currentLocation);
            updateMyLocation(currentLocation);
            setPrevLocation(currentLocation);
          } else {
            const distance = fetchDistance(
              prevLocationRef.current,
              currentLocation
            );

            if (distance) {
              if (distance >= 50) {
                setPrevLocation(currentLocation);
                if (centerRef.current) {
                  fetchMusicc(true, currentLocation);
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
};

export default useLocationWatcher;
