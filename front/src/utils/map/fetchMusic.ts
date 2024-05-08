import { postMusicRadius } from "@services/mapAPi";
import { Location, Marker } from "../../types/mapType";
import { SetterOrUpdater } from "recoil";
import arraysAreEqual from "./arraysAreEqual";

const fetchMusic = async (
  isUserLocation: boolean,
  position: Location,
  markers: Marker[],
  setMarkers: SetterOrUpdater<Marker[]>
) => {
  try {
    const data = await postMusicRadius(isUserLocation, position);
    if (!arraysAreEqual(data, markers)) {
      setMarkers(data);
    }
  } catch (err) {
    console.error(err);
  }
};

export default fetchMusic;
