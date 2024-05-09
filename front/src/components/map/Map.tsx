import { memo, useState } from "react";
import ToasterMsg from "@components/ToasterMsg";
import MapHeader from "./MapHeader";
import LoadMap from "@components/map/LoadMap";
import Loading from "@components/Loading";
import "@styles/map/Map.scss";

const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [tilesLoaded, setTilesLoaded] = useState(false);

  return (
    <div className="Map">
      {tilesLoaded && <MapHeader map={map} />}
      <LoadMap
        map={map}
        setMap={setMap}
        tilesLoaded={tilesLoaded}
        setTilesLoaded={setTilesLoaded}
      />
      <ToasterMsg />
      {!tilesLoaded && <Loading />}
    </div>
  );
};

export default memo(Map);
