import { requestPermission } from "@/notificaiton/firebase-messaging-sw";
import Navbar from "@components/Navbar";
import Map from "@components/map/Map";
import MapSwiper from "@components/map/MapSwiper";
import {
  radiusActiveIdState,
  couponUsageActiveIdState,
} from "@store/map/atoms";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  useEffect(() => {
    requestPermission();
  }, []);
  const radiusActiveId = useRecoilValue(radiusActiveIdState);
  const couponUsageActiverId = useRecoilValue(couponUsageActiveIdState);
  return (
    <div className="HomePage">
      <Map />
      {radiusActiveId || couponUsageActiverId ? <MapSwiper /> : <Navbar />}
    </div>
  );
};

export default HomePage;
