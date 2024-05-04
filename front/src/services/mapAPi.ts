import { axiosApi } from "@/utils/common";
import { Marker, Location, Address } from "../types/mapType";

async function postMusicRadius(
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

const postAddress = async (position: Location): Promise<Address> => {
  try {
    const { data } = await axiosApi().post<Address>(`music/reverse-geocode`, {
      latitude: position.lat,
      longitude: position.lng,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export { postMusicRadius, postAddress };
