import { CIRCLE_OPTIONS, CONTAINER_STYLE, MAP_OPTIONS } from "@constants/map";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  CircleF,
  OverlayViewF,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import MapHeader from "./MapHeader";
import marker from "@assets/images/usermarker.webp";
import pin from "@assets/images/pin.webp";
import pin1 from "@assets/images/pin1.webp";
import "@styles/map/Map.scss";
import { toastMsg } from "@/utils/toastMsg";
import { ToasterMsg } from "@components/ToasterMsg";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeMarkerState,
  locationState,
  markersState,
} from "@store/map/atoms";

interface Location {
  lat: number;
  lng: number;
}

interface Marker {
  id: number;
  position: Location;
}

const googleMapsLibraries: ("places" | "geometry")[] = ["places", "geometry"];

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB6-Xpzz_O5OWj5KOavve7YKqn2ii_4uoQ",
    language: "ko",
    libraries: googleMapsLibraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [address, setAddress] = useState("");
  const markers = useRecoilValue(markersState);
  const [location, setLocation] = useRecoilState(locationState);
  const [activeMarkerId, setActiveMarkerId] = useRecoilState(activeMarkerState);

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const a = (currentLocation: Location) => {
    setLocation(currentLocation);
    map?.panTo(currentLocation);
    map?.setZoom(15);
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

  const outsideCircleClick = () => {
    toastMsg("반경 밖 음악을 듣고 싶다면 위치를 이동해 보세요!");
    setActiveMarkerId(null);
  };

  const getOnClickFunction = (marker: Marker) => {
    // console.log(marker);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(location.lat, location.lng),
      new google.maps.LatLng(marker.position.lat, marker.position.lng)
    );

    return distance <= 600
      ? setActiveMarkerId(marker.id) // handleMarkerClick(marker.id)
      : outsideCircleClick();
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
          map?.panTo(currentLocation);
          fetchAddress(currentLocation);
        },
        () => {
          console.error("Error fetching location");
        }
      );
    }
  }, [map]);

  return isLoaded ? (
    <div className="Map">
      <MapHeader address={address} a={a} />
      <GoogleMap
        mapContainerStyle={CONTAINER_STYLE}
        center={location}
        zoom={15}
        options={MAP_OPTIONS}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <CircleF center={location} options={CIRCLE_OPTIONS} />
        <MarkerF
          position={location}
          icon={{
            url: marker,
            scaledSize: new window.google.maps.Size(60, 60),
            anchor: new window.google.maps.Point(30, 30),
          }}
        />
        {markers.map((marker) => (
          <OverlayViewF
            key={marker.id}
            position={marker.position}
            mapPaneName="overlayMouseTarget"
            getPixelPositionOffset={(width, height) => ({
              x: -width / 2,
              y: -height / 1.2,
            })}
          >
            <div
              onClick={() => {
                getOnClickFunction(marker);
              }}
            >
              <img
                src={marker.id === activeMarkerId ? pin1 : pin}
                alt="Custom Overlay"
                style={{ width: "30px", height: "35px" }}
              />
              <div className="cover-img">
                <img src={marker.music.img} alt="Custom Overlay" />
              </div>
            </div>
          </OverlayViewF>
        ))}
      </GoogleMap>
      <ToasterMsg />
    </div>
  ) : null;
};

export default Map;
