import { locationState } from "@store/map/atoms";
import { Location } from "../../types/mapType";
import { useSetRecoilState } from "recoil";
import useFetchAddress from "@hooks/map/useFetchAddress";

const useUpdateMyLocation = () => {
  const setLocation = useSetRecoilState(locationState);
  const { fetchAddress } = useFetchAddress();

  const updateMyLocation = (location: Location) => {
    setLocation(location);
    fetchAddress(location, "myLocation");
  };

  return { updateMyLocation };
};

export default useUpdateMyLocation;
