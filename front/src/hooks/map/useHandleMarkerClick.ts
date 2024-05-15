import { getCheckRadiusCoupon } from "@services/mapAPi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  couponUsageActiveIdState,
  locationState,
  radiusActiveIdState,
} from "@store/map/atoms";
import { toastMsg } from "@/utils/toastMsg";
import getDistance from "@/utils/map/fetchDistance";
import { Marker } from "../../types/mapType";

const useHandleMarkerClick = () => {
  const setRadiusActiveId = useSetRecoilState(radiusActiveIdState);
  const setCouponUsageActiveId = useSetRecoilState(couponUsageActiveIdState);
  const location = useRecoilValue(locationState);

  const handleMarkerClick = async (marker: Marker) => {
    try {
      const distance = getDistance(
        { lat: marker.latitude, lng: marker.longitude },
        location
      );

      if (distance <= 600) {
        setRadiusActiveId(marker.itemId);
      } else {
        const data = await getCheckRadiusCoupon();
        if (data) {
          setCouponUsageActiveId(marker.itemId);
        } else {
          toastMsg("반경 밖 음악을 듣고 싶다면 위치를 이동해 보세요!");
          setRadiusActiveId((prev) => {
            if (prev === null) {
              return prev;
            }
            return null;
          });
          setCouponUsageActiveId((prev) => {
            if (prev === null) {
              return prev;
            }
            return null;
          });
        }
      }
    } catch (error) {
      console.error("Error checking coupon availability:", error);
      toastMsg("잠시 후 다시 이용해 주세요");
    }
  };

  return { handleMarkerClick };
};

export default useHandleMarkerClick;
