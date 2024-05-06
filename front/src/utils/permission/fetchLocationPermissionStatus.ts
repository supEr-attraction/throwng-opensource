const fetchLocationPermissionStatus = async () => {
  if ("permissions" in navigator) {
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });
      return permission.state;
    } catch (error) {
      return "blocked";
    }
  } else {
    return "not-supported";
  }
};

export default fetchLocationPermissionStatus;
