import Navbar from "@components/Navbar";
import Map from "@components/map/Map";
import MapSwiper from "@components/map/MapSwiper";
// import { useState } from "react";
import { activeMarkerState } from "@store/map/atoms";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  const activeMarkerId = useRecoilValue(activeMarkerState);
  // const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {}, []);

  return (
    <div className="HomePage">
      <Map />
      {activeMarkerId ? <MapSwiper /> : <Navbar />}
    </div>
  );
};

export default HomePage;
