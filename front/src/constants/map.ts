export const GOOGLE_MAPS_LIBRARIES: ("places" | "geometry")[] = [
  "places",
  "geometry",
];

export const CONTAINER_STYLE = {
  width: "100dvw",
  height: "100dvh",
};

export const MARKER_VISIBLE_OPTIONS = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  // {
  //   featureType: "poi.business", // 비즈니스 포인트 (상점, 식당 등) 숨기기
  //   stylers: [{ visibility: "off" }], // 비즈니스 정보를 숨김
  // },
  {
    featureType: "transit", // 대중교통 정보 숨기기
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
];

export const MARKER_COLOR_OPTIONS = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#fff" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#808080" }, // 경계선을 밝은 색으로 설정
      { weight: 0.5 }, // 선 두께를 더욱 두껍게 설정
    ],
  },
];

export const CIRCLE_OPTIONS = {
  strokeColor: "#7B66FF",
  strokeOpacity: 0.5,
  strokeWeight: 1,
  fillColor: "#7B66FF",
  fillOpacity: 0.1,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 600,
  zIndex: 1,
};

export const MAP_OPTIONS = {
  styles: [...MARKER_VISIBLE_OPTIONS, ...MARKER_COLOR_OPTIONS],
  disableDefaultUI: true, // 모든 기본 UI 컨트롤 비활성화
  keyboardShortcuts: false, // 키보드 단축키 비활성화
  // restriction: {
  //   latLngBounds: {
  //     north: 40.0, // 북한의 북쪽 경계
  //     south: 33.0, // 한반도의 남쪽 경계
  //     east: 131.9, // 동해안 경계
  //     west: 124.0, // 서해안 경계
  //   },
  //   strictBounds: true,
  // },
  minZoom: 7, // 최소 확대 레벨
};

export const IMAGE_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgMBAAjAB2hgAAAAAElFTkSuQmCC";

export const CLUSTER_STYLES = [
  {
    url: IMAGE_URL,
    className: "clusterer1",
    height: 50,
    width: 50,
    textSize: 15,
    textColor: "#a5b2c5",
  },
  {
    url: IMAGE_URL,
    className: "clusterer2",
    height: 70,
    width: 70,
    textSize: 15,
    textColor: "#a5b2c5",
  },
  {
    url: IMAGE_URL,
    className: "clusterer3",
    height: 90,
    width: 90,
    textSize: 15,
    textColor: "#a5b2c5",
  },
];
