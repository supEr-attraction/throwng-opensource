import { requestPermission } from "@/notificaiton/firebase-messaging-sw";
import Navbar from "@components/Navbar";
import Map from "@components/map/Map";
import MapSwiper from "@components/map/MapSwiper";
import { activeMarkerState } from "@store/map/atoms";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  useEffect(() => {
    requestPermission();
  }, []);
  const activeMarkerId = useRecoilValue(activeMarkerState);
  return (
    <div className="HomePage">
      <Map />
      {activeMarkerId ? <MapSwiper /> : <Navbar />}
    </div>
  );
};

export default HomePage;
