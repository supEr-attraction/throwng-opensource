import { postMusicRadius } from "@services/mapAPi";
import { Location, Marker } from "../../types/mapType";
import { SetterOrUpdater } from "recoil";

const fetchMusic = async (
  isUserLocation: boolean,
  position: Location,
  setMarkers: SetterOrUpdater<Marker[]>
) => {
  try {
    const data = await postMusicRadius(isUserLocation, position);
    setMarkers(data);
  } catch (err) {
    console.error(err);
  }
};

export default fetchMusic;
