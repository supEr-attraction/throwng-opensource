import { memo, useCallback } from "react";
import { OverlayViewF } from "@react-google-maps/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  radiusActiveIdState,
  couponUsageActiveIdState,
  locationState,
} from "@store/map/atoms";
import { Marker } from "../../types/mapType";
import { toastMsg } from "@/utils/toastMsg";
import getDistance from "@/utils/map/fetchDistance";
import whitePin from "@assets/images/whitePin.webp";
import purplePin from "@assets/images/purplePin.webp";
import {
  isActiveOutsideState,
  isActiveInsideState,
} from "@store/map/selectors";
import { getCheckRadiusCoupon } from "@services/mapAPi";

interface Props {
  marker: Marker;
}

const MusicMarkerItem = ({ marker }: Props) => {
  const setRadiusActiveId = useSetRecoilState(radiusActiveIdState);
  const setCouponUsageActiveId = useSetRecoilState(couponUsageActiveIdState);
  const isActiveInside = useRecoilValue(isActiveInsideState(marker.itemId));
  const isActiveOutside = useRecoilValue(isActiveOutsideState(marker.itemId));
  const location = useRecoilValue(locationState);

  const handleMarkerClick = useCallback(async () => {
    try {
      const distance = getDistance(
        { lat: marker.latitude, lng: marker.longitude },
        location
      );

      const data = await getCheckRadiusCoupon();

      if (distance <= 600) {
        setRadiusActiveId(marker.itemId);
      } else {
        if (data) {
          setCouponUsageActiveId(marker.itemId);
        } else {
          toastMsg("반경 밖 음악을 듣고 싶다면 위치를 이동해 보세요!");
          setRadiusActiveId(null);
        }
      }
    } catch (error) {
      console.error("Error checking coupon availability:", error);
      toastMsg("잠시 후 다시 이용해 주세요");
    }
  }, [marker, location]);

  return (
    <OverlayViewF
      key={marker.itemId}
      position={{ lat: marker.latitude, lng: marker.longitude }}
      mapPaneName="overlayMouseTarget"
      zIndex={1}
      getPixelPositionOffset={(width, height) => ({
        x: -width / 2,
        y: -height / 1.2,
      })}
    >
      <div className="MusicMarkerItem" onClick={handleMarkerClick}>
        <img
          src={isActiveInside || isActiveOutside ? purplePin : whitePin}
          alt="Custom Overlay"
          style={{ width: "30px", height: "35px" }}
          loading="lazy"
        />
        <div className="cover-img">
          <img src={marker.albumImage} alt="Custom Overlay" />
        </div>
      </div>
    </OverlayViewF>
  );
};

export default memo(MusicMarkerItem);
