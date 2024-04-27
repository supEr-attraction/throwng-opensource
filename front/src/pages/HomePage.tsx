import Navbar from "@components/Navbar";
import Map from "@components/map/Map";
import MapSwiper from "@components/map/MapSwiper";
import { activeMarkerState } from "@store/map/atoms";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  const activeMarkerId = useRecoilValue(activeMarkerState);

  return (
    <div className="HomePage">
      <Map />
      {activeMarkerId ? <MapSwiper /> : <Navbar />}
    </div>
  );
};

export default HomePage;
