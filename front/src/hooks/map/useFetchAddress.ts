import { postAddress } from "@services/mapAPi";
import { mapCenterAddressState, myAddressState } from "@store/map/atoms";
import { Location } from "../../types/mapType";
import { useSetRecoilState } from "recoil";

const useFetchAddress = () => {
  const setMyAddress = useSetRecoilState(myAddressState);
  const setMapCenterAddress = useSetRecoilState(mapCenterAddressState);

  const fetchAddress = async (
    position: Location,
    type: "myLocation" | "mapCenter"
  ) => {
    try {
      const data = await postAddress(position);
      if (type === "myLocation") {
        setMyAddress((prev) => {
          if (prev.code !== data.code) {
            return data;
          }
          return prev;
        });
      } else {
        setMapCenterAddress((prev) => {
          if (prev.code !== data.code) {
            return data;
          }
          return prev;
        });
      }
    } catch (err) {
      console.error(err);
      throw new Error('useFetchAddress');
    }
  };

  return { fetchAddress };
};

export default useFetchAddress;
