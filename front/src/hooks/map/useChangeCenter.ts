import useFetchAddress from "@hooks/map/useFetchAddress";
import useFetchMusic from "@hooks/map/useFetchMusic";
import { centerState, locationState } from "@store/map/atoms";
import { useRecoilValue } from "recoil";

const useChangeCenter = () => {
  const { fetchMusicc } = useFetchMusic();
  const { fetchAddress } = useFetchAddress();

  const center = useRecoilValue(centerState);
  const location = useRecoilValue(locationState);

  const changeCenter = (map: google.maps.Map | null, initialLoad: boolean) => {
    if (map) {
      if (!center) {
        const mapCenter = map.getCenter();
        if (mapCenter) {
          const mapPosition = { lat: mapCenter.lat(), lng: mapCenter.lng() };
          fetchMusicc(false, mapPosition);
          fetchAddress(mapPosition, "mapCenter");
        }
      } else {
        if (!initialLoad) {
          fetchMusicc(true, location);
        }
      }
    }
  };

  return { changeCenter };
};

export default useChangeCenter;
