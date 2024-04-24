interface Marker {
  id: number;
  position: { lat: number; lng: number };
  music: {
    img: string;
    title: string;
    singer: string;
  };
}

const getDistance = (
  marker: Marker,
  location: { lat: number; lng: number }
) => {
  const distance = google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(location.lat, location.lng),
    new google.maps.LatLng(marker.position.lat, marker.position.lng)
  );

  return distance;
};

export default getDistance;
