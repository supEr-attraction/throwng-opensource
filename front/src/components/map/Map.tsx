import { CONTAINER_STYLE, MAP_OPTIONS } from "@constants/map";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
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
import "@styles/map/Map.scss";
import getDistance from "@/utils/map/getDistance";
import MyLocation from "@components/map/MyLocation";
import MusicMarkerItem from "@components/map/MusicMarkerItem";
import { getMusicRadius, postAddress } from "@services/mapAPi";
import { Location } from "../../types/mapType";

const GOOGLE_MAPS_LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    language: "ko",
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [location, setLocation] = useRecoilState(locationState);
  const [prevLocation, setPrevLocation] = useRecoilState(prevLocationState);
  const [markers, setMarkers] = useRecoilState(markersState);
  const [center, setCenter] = useRecoilState(centerState);
  const setAddress = useSetRecoilState(addressState);
  const setMapCenterAddress = useSetRecoilState(mapCenterAddressState);
  const [initialLoad, setInitialLoad] = useState(true);
  const [centerLocation, setCenterLocation] = useState({ lat: 0, lng: 0 });
  const centerRef = useRef(center);
  const prevLocationRef = useRef(prevLocation);
  const initialLoadRef = useRef(initialLoad);
  const isValidLocation = centerLocation.lat !== 0 && centerLocation.lng !== 0;

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => setMap(null), []);

  const returnMyLocation = () => {
    if (map) {
      const zoom = map.getZoom();
      if (zoom !== undefined && zoom < 15) {
        map.setZoom(15);
      }
      getMusic(true, location);
      map.panTo(location);
      setCenter(true);
    }
  };

  const changeCenter = () => {
    if (map && !center && isValidLocation) {
      const mapCenter = map.getCenter();
      if (mapCenter) {
        const mapPosition = { lat: mapCenter.lat(), lng: mapCenter.lng() };
        if (mapPosition.lat !== 0 && mapPosition.lng !== 0) {
          getMusic(false, mapPosition);
          fetchAddress(mapPosition, "mapCenter");
        }
      }
    }
  };

  const getMusic = async (isUserLocation: boolean, position: Location) => {
    try {
      const data = await getMusicRadius(isUserLocation, position);
      setMarkers(data);
    } catch (err) {
      console.error(err);
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

  const onDragEnd = () => {
    if (!initialLoad && center) {
      setCenter(false);
    }
  };

  const onZoomChanged = () => {
    if (!initialLoad && center) {
      setCenter(false);
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
            setCenterLocation(currentLocation);
            getMusic(true, currentLocation);
            fetchAddress(currentLocation, "myLocation");
            setLocation(currentLocation);
            setPrevLocation(currentLocation);
            // setCenter(true);
            setInitialLoad(false);
          } else {
            const distance = getDistance(
              prevLocationRef.current,
              currentLocation
            );

            if (distance >= 50) {
              setPrevLocation(currentLocation);
              if (centerRef.current) {
                getMusic(true, currentLocation);
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

  return isLoaded ? (
    <div className="Map">
      {isValidLocation && <MapHeader returnMyLocation={returnMyLocation} />}
      <GoogleMap
        mapContainerStyle={CONTAINER_STYLE}
        center={centerLocation}
        zoom={15}
        options={MAP_OPTIONS}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDragStart={onDragEnd}
        onZoomChanged={onZoomChanged}
        onIdle={changeCenter}
      >
        <MyLocation />
        {markers.map((marker) => (
          <MusicMarkerItem key={marker.itemId} marker={marker} />
        ))}
      </GoogleMap>
      <ToasterMsg />
    </div>
  ) : (
    <></>
  );
};

export default memo(Map);
