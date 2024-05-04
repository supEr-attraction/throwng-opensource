import { Location } from "../../types/mapType";

const fetchDistance = (marker: Location, location: Location) => {
  const distance = google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(location.lat, location.lng),
    new google.maps.LatLng(marker.lat, marker.lng)
  );

  return distance;
};

export default fetchDistance;
