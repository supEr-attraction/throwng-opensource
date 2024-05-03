import { axiosApi } from "@/utils/common";
import { Marker, Location } from "../types/mapType";

async function getMusicRadius(
  isUserLocation: boolean,
  position: Location
): Promise<Marker[]> {
  try {
    const { data } = await axiosApi().post<Marker[]>(`music/thrown/points`, {
      isUserLocation,
      latitude: position.lat,
      longitude: position.lng,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

const postAddress = async (position: Location): Promise<string> => {
  try {
    const { data } = await axiosApi().post<{ regionName: string }>(
      `music/reverse-geocode`,
      {
        latitude: position.lat,
        longitude: position.lng,
      }
    );
    return data.regionName;
  } catch (error) {
    throw error;
  }
};

export { getMusicRadius, postAddress };
