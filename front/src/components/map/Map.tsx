import { CONTAINER_STYLE, MAP_OPTIONS } from "@constants/map";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useState } from "react";
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
import { Location } from "../../types/mapType";
import "@styles/map/Map.scss";
import getDistance from "@/utils/map/getDistance";
import MyLocation from "@components/map/MyLocation";
import MusicMarkerItem from "@components/map/MusicMarkerItem";
import { getMusicRadius, postAddress } from "@services/mapAPi";
import Loading from "@components/Loading";

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

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);
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
    if (map && !center) {
      const mapCenter = map.getCenter()!;
      const mapPosition = { lat: mapCenter.lat(), lng: mapCenter.lng() };
      getMusic(false, mapPosition);
      fetchAddress(mapPosition, "mapCenter");
    }
  };

  // const fetchAddress = (location: Location, type: string): void => {
  //   if (isLoaded) {
  //     const geocoder = new window.google.maps.Geocoder();
  //     geocoder.geocode({ location }, (results, status) => {
  //       if (status === google.maps.GeocoderStatus.OK) {
  //         if (results?.[0]) {
  //           const addressComponents = results[0].address_components;
  //           let district = "";
  //           let neighborhood = "";
  //           console.log(addressComponents);

  //           addressComponents.forEach((component) => {
  //             if (component.types.includes("sublocality_level_2")) {
  //               neighborhood = component.long_name;
  //             }
  //             if (
  //               component.types.includes("sublocality_level_1") &&
  //               component.types.includes("political")
  //             ) {
  //               district = component.long_name;
  //             }
  //           });
  //           type === "myLocation"
  //             ? setAddress(`${district} ${neighborhood}`)
  //             : setMapCenterAddress(`${district} ${neighborhood}`);
  //         } else {
  //           console.error("No address found");
  //         }
  //       } else {
  //         console.error("Geocoder failed: " + status);
  //       }
  //     });
  //   }
  // };

  const getMusic = async (
    isUserLocation: boolean,
    position: {
      lat: number;
      lng: number;
    }
  ) => {
    const data = await getMusicRadius(isUserLocation, position);
    setMarkers(data);
  };

  const fetchAddress = async (
    position: {
      lat: number;
      lng: number;
    },
    type: string
  ) => {
    const data = await postAddress(position);
    console.log(data);
    type === "myLocation" ? setAddress(data) : setMapCenterAddress(data);
  };

  const onDragEnd = () => {
    if (center) {
      setCenter(false);
      console.log("drag");
    }
  };

  const onZoomChanged = () => {
    if (!initialLoad && center) {
      setCenter(false);
      console.log("zoom");
    }
  };

  useEffect(() => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const currentLocation = {
            lat: coords.latitude,
            lng: coords.longitude,
          };
          map.setCenter(currentLocation);
          setLocation(currentLocation);
          setPrevLocation(currentLocation);
          getMusic(true, currentLocation);
          fetchAddress(currentLocation, "myLocation");
          setCenter(true);
          setInitialLoad(false);
        },
        () => {
          console.error("Error fetching location");
        }
      );
    }
  }, [map]);

  useEffect(() => {
    if (map && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        ({ coords }) => {
          const currentLocation = {
            lat: coords.latitude,
            lng: coords.longitude,
          };

          const distance = getDistance(prevLocation, currentLocation);

          if (distance >= 50) {
            setPrevLocation(currentLocation);
            if (center) {
              getMusic(true, currentLocation);
            }
          }

          if (center) {
            map.panTo(currentLocation);
          }

          setLocation(currentLocation);
          fetchAddress(currentLocation, "myLocation");
        },
        () => {
          console.error("Error fetching location");
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [center, prevLocation]);

  return isLoaded ? (
    <div className="Map">
      <MapHeader returnMyLocation={returnMyLocation} />
      <GoogleMap
        mapContainerStyle={CONTAINER_STYLE}
        // center={location}
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
