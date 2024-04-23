import { CIRCLE_OPTIONS, CONTAINER_STYLE, MAP_OPTIONS } from "@constants/map";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import marker from "@assets/images/usermarker.webp";
import MapHeader from "./MapHeader";
import pin from "@assets/images/pin.webp";
import pin1 from "@assets/images/pin1.webp";
import "@styles/map/Map.scss";
import { toastMsg } from "@/utils/toastMsg";
import { ToasterMsg } from "@components/ToasterMsg";

interface Location {
  lat: number;
  lng: number;
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
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);

  const handleMarkerClick = (id: number) => {
    setActiveMarkerId(id); // 클릭된 마커 ID로 상태 업데이트
  };

  const getMarkerIcon = (id: number) => ({
    url: id === activeMarkerId ? pin1 : pin,
    scaledSize: new window.google.maps.Size(46, 50),
    origin: new window.google.maps.Point(0, 0), // 이미지에서 마커로 사용할 부분의 시작점
    // anchor: new window.google.maps.Point(23, 25),
  });

  const [markers, setMarkers] = useState([
    {
      id: 1,
      position: { lat: 35.203117334571935, lng: 126.80858111342218 },
      music: {
        img: "https://www.akbobada.com/home/akbobada/archive/akbo/img/202404011417025.jpg",
        title: "Magnetic",
        singer: "아일릿(ILLIT)",
      },
    },
    {
      id: 2,
      position: { lat: 35.203910921628214, lng: 126.81463012075089 },
      music: {
        img: "https://www.akbobada.com/home/akbobada/archive/akbo/img/202404031519030.jpg",
        title: "고민중독",
        singer: "QWER",
      },
    },
    {
      id: 3,
      position: { lat: 35.196855157684766, lng: 126.80999034944725 },
      music: {
        img: "https://i.namu.wiki/i/vhLGDDDc-Li_qN6coMRSYw8y9o6P35-LiCqqVD0cW6EtaDIkCv1qcRx0Pv7_B0y-Y3t2HOjhHXWgCkgvrBLgGg.webp",
        title: "밤양갱",
        singer: "비비 (BIBI)",
      },
    },
    // ... 다른 마커 데이터
  ]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const a = (currentLocation: { lat: number; lng: number }) => {
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
            console.log(addressComponents);

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
            console.log(`구: ${district}, 동: ${neighborhood}`); // 구와 동을 콘솔에 출력
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

  // const insideCircleClick = (marker) => {
  //   console.log("Clicked inside circle:", marker.id);
  //   // Additional logic for markers inside the circle
  // };

  // const outsideCircleClick = () => {
  //   toastMsg("반경 밖 음악을 듣고 싶다면 위치를 이동해 보세요!");
  //   // Additional logic for markers outside the circle
  // };

  // const getOnClickFunction = (marker) => {
  //   console.log(marker);
  //   const distance = google.maps.geometry.spherical.computeDistanceBetween(
  //     new google.maps.LatLng(location.lat, location.lng),
  //     new google.maps.LatLng(marker.position.lat, marker.position.lng)
  //   );

  //   console.log(distance);

  //   return distance <= 600 ? insideCircleClick(marker) : outsideCircleClick();
  // };

  useEffect(() => {
    console.log(navigator.geolocation);
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
        onClick={() => setActiveMarkerId(null)}
      >
        <CircleF center={location} options={CIRCLE_OPTIONS} />
        <MarkerF
          position={location}
          icon={{
            url: marker, // 그라데이션을 적용한 마커 이미지의 URL
            scaledSize: new window.google.maps.Size(60, 60), // 마커의 크기를 조정합니다.
            // origin: new window.google.maps.Point(0, 0), // 이미지에서 마커로 사용할 부분의 시작점
            anchor: new window.google.maps.Point(30, 30), // 마커가 지도에 고정될 위치 (이미지의 중심점)
          }}
        />
        {/* {markers.map((marker) => (
          <MarkerF
            key={marker.id}
            icon={getMarkerIcon(marker.id)}
            position={marker.position}
            onClick={() => handleMarkerClick(marker.id)}
            // onClick={() => getOnClickFunction(marker)}
          />
        ))} */}
        {/* {location && (
        <Marker
          position={location}
          icon={{
            url: marker, // 그라데이션을 적용한 마커 이미지의 URL
            scaledSize: new window.google.maps.Size(60, 60), // 마커의 크기를 조정합니다.
            // origin: new window.google.maps.Point(0, 0), // 이미지에서 마커로 사용할 부분의 시작점
            anchor: new window.google.maps.Point(30, 30), // 마커가 지도에 고정될 위치 (이미지의 중심점)
          }}
        />
      )} */}
      </GoogleMap>
      <ToasterMsg />
    </div>
  ) : null;
};

export default Map;
