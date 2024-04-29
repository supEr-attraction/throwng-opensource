import { axiosApi } from "@/utils/common";
import { Marker } from "../types/mapType";

async function getMusicRadius(
  isUserLocation: boolean,
  position: { lat: number; lng: number }
): Promise<Marker[]> {
  try {
    const { data } = await axiosApi().post<Marker[]>(`music/thrown/points`, {
      isUserLocation,
      latitude: position.lat,
      longitude: position.lng,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getMusicRadius };
