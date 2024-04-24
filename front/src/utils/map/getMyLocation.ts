export default function getMyLocation(map: google.maps.Map | null) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map?.panTo(currentLocation);
        console.log(currentLocation);

        return currentLocation;
      },
      () => {
        console.error("Error fetching location");
        return null;
      }
    );
  } else {
    return null;
  }
}
