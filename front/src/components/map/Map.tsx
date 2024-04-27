import { CENTER, CONTAINER_STYLE, MAP_OPTIONS } from "@constants/map";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useState } from "react";
import MapHeader from "./MapHeader";
import { ToasterMsg } from "@components/ToasterMsg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  addressState,
  locationState,
  markersState,
  prevLocationState,
} from "@store/map/atoms";
import { Location } from "../../types/mapType";
import "@styles/map/Map.scss";
import getDistance from "@/utils/map/getDistance";
import MyLocation from "@components/map/MyLocation";
import MusicMarkerItem from "@components/map/MusicMarkerItem";

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
  const setAddress = useSetRecoilState(addressState);
  const markers = useRecoilValue(markersState);

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const updateMyLocation = () => {
    map?.panTo(location);
    map?.setZoom(15);
  };

  const updateLocation = (position: GeolocationPosition) => {
    const currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    getOnClickFunction(currentLocation);
    setLocation(currentLocation);
    // map?.panTo(currentLocation);
    fetchAddress(currentLocation);
  };

  const fetchAddress = (location: Location): void => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results?.[0]) {
            const addressComponents = results[0].address_components;
            let district = "";
            let neighborhood = "";
            // console.log(addressComponents);

            addressComponents.forEach((component) => {
              if (component.types.includes("sublocality_level_2")) {
                neighborhood = component.long_name;
              }
              if (
                component.types.includes("sublocality_level_1") &&
                component.types.includes("political")
              ) {
                district = component.long_name;
              }
            });
            // console.log(`구: ${district}, 동: ${neighborhood}`); // 구와 동을 콘솔에 출력
            setAddress(`${district} ${neighborhood}`);
          } else {
            console.error("No address found");
          }
        } else {
          console.error("Geocoder failed: " + status);
        }
      });
    }
  };

  const getOnClickFunction = (current: Location) => {
    // console.log(marker);
    if (isLoaded) {
      const distance = getDistance(prevLocation, location);

      if (distance >= 50) {
        setPrevLocation(current);
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(currentLocation);
          setPrevLocation(currentLocation);
          fetchAddress(currentLocation);
          map?.panTo(currentLocation);
        },
        () => {
          console.error("Error fetching location");
        }
      );

      const watchId = navigator.geolocation.watchPosition(
        updateLocation,
        () => {
          console.error("Error fetching location");
        }
      );

      // Clean up watcher on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [map]);

  return isLoaded ? (
    <div className="Map">
      <MapHeader updateMyLocation={updateMyLocation} />
      <GoogleMap
        mapContainerStyle={CONTAINER_STYLE}
        center={CENTER}
        zoom={15}
        options={MAP_OPTIONS}
        onLoad={onLoad}
        onUnmount={onUnmount}
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
