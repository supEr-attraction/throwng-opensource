import {
  CONTAINER_STYLE,
  GOOGLE_MAPS_LIBRARIES,
  MAP_OPTIONS,
} from "@constants/map";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import MapHeader from "./MapHeader";
import { ToasterMsg } from "@components/ToasterMsg";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  addressState,
  centerState,
  locationState,
  mapCenterAddressState,
  markersState,
  prevLocationState,
} from "@store/map/atoms";
import MyLocation from "@components/map/MyLocation";
import { postAddress } from "@services/mapAPi";
import { Location } from "../../types/mapType";
import fetchMusic from "@/utils/map/fetchMusic";
import fetchDistance from "@/utils/map/fetchDistance";
import MapClusterer from "./MapClusterer";
import Loading from "@components/Loading";
import "@styles/map/Map.scss";

const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [location, setLocation] = useRecoilState(locationState);
  const [prevLocation, setPrevLocation] = useRecoilState(prevLocationState);
  const [center, setCenter] = useRecoilState(centerState);
  const setAddress = useSetRecoilState(addressState);
  const setMarkers = useSetRecoilState(markersState);
  const setMapCenterAddress = useSetRecoilState(mapCenterAddressState);
  const [initialLoad, setInitialLoad] = useState(true);
  const [tilesLoaded, setTilesLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(15);
  const centerRef = useRef(center);
  const prevLocationRef = useRef(prevLocation);
  const initialLoadRef = useRef(initialLoad);

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);

  const onUnmount = useCallback(() => setMap(null), []);

  const returnMyLocation = () => {
    if (map) {
      const zoom = map.getZoom();
      if (zoom !== undefined && zoom < 15) {
        setZoomLevel(15);
      }
      fetchMusic(true, location, setMarkers);
      map.panTo(location);
      setCenter(true);
    }
  };

  const fetchAddress = async (position: Location, type: string) => {
    try {
      const data = await postAddress(position);
      type === "myLocation" ? setAddress(data) : setMapCenterAddress(data);
    } catch (err) {
      console.error(err);
    }
  };

  const changeCenter = () => {
    if (map && !center) {
      const mapCenter = map.getCenter();
      if (mapCenter) {
        const mapPosition = { lat: mapCenter.lat(), lng: mapCenter.lng() };
        if (mapPosition.lat !== 0 && mapPosition.lng !== 0) {
          fetchMusic(false, mapPosition, setMarkers);
          fetchAddress(mapPosition, "mapCenter");
        }
      }
    }
  };

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

  const onTilesLoaded = () => {
    if (!tilesLoaded) {
      setTilesLoaded(true);
    }
  };

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
            map.setCenter(currentLocation);
            fetchMusic(true, currentLocation, setMarkers);
            fetchAddress(currentLocation, "myLocation");
            setLocation(currentLocation);
            setPrevLocation(currentLocation);
            setInitialLoad(false);
          } else {
            const distance = fetchDistance(
              prevLocationRef.current,
              currentLocation
            );

            if (distance >= 50) {
              setPrevLocation(currentLocation);
              if (centerRef.current) {
                fetchMusic(true, currentLocation, setMarkers);
              }
            }

            setLocation(currentLocation);
            fetchAddress(currentLocation, "myLocation");

            if (centerRef.current) {
              map.panTo(currentLocation);
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
    <div className="Map">
      {tilesLoaded && <MapHeader returnMyLocation={returnMyLocation} />}
      <LoadScriptNext
        id="google-map-script"
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
        language="ko"
        libraries={GOOGLE_MAPS_LIBRARIES}
        loadingElement={<></>}
      >
        <GoogleMap
          mapContainerStyle={CONTAINER_STYLE}
          zoom={zoomLevel}
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
              <MapClusterer zoomLevel={zoomLevel} />
            </>
          )}
        </GoogleMap>
      </LoadScriptNext>
      <ToasterMsg />
      {!tilesLoaded && <Loading />}
    </div>
  );
};

export default memo(Map);
