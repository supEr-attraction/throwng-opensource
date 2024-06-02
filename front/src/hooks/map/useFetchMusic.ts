import arraysAreEqual from "@/utils/map/arraysAreEqual";
import { postMusicRadius } from "@services/mapAPi";
import { markersState } from "@store/map/atoms";
import { Location } from "../../types/mapType";
import { useSetRecoilState } from "recoil";

const useFetchMusic = () => {
  const setMarkers = useSetRecoilState(markersState);

  const fetchMusicc = async (isUserLocation: boolean, position: Location) => {
    try {
      const data = await postMusicRadius(isUserLocation, position);
      setMarkers((prev) => {
        if (!arraysAreEqual(data, prev)) {
          return data;
        }
        return prev;
      });
    } catch (err) {
      console.error(err);
      setMarkers([]);
      // throw new Error('useFetchMusic');
    }
  };

  return { fetchMusicc };
};

export default useFetchMusic;
