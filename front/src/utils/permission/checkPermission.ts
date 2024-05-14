import fetchLocationPermissionStatus from "./fetchLocationPermissionStatus";

const checkPermission = async (): Promise<boolean> => {
  try {
    const status = await fetchLocationPermissionStatus();
    return ["granted", "prompt"].includes(status);
  } catch (error) {
    throw error;
  }
};

export default checkPermission;
