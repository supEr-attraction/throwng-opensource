import arraysAreEqual from "@/utils/map/arraysAreEqual";
import { postMusicRadius } from "@services/mapAPi";
import { markersState } from "@store/map/atoms";
import { Location } from "../../types/mapType";
import { useRecoilState } from "recoil";

const useFetchMusic = () => {
  const [markers, setMarkers] = useRecoilState(markersState);

  const fetchMusic = async (isUserLocation: boolean, position: Location) => {
    try {
      const data = await postMusicRadius(isUserLocation, position);
      if (!arraysAreEqual(data, markers)) {
        setMarkers(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { fetchMusic };
};

export default useFetchMusic;
