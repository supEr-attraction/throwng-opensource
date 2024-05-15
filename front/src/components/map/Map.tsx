import { memo, useState } from "react";
import ToasterMsg from "@components/ToasterMsg";
import MapHeader from "./MapHeader";
import LoadMap from "@components/map/LoadMap";
import Loading from "@components/Loading";
import "@styles/map/Map.scss";

const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  return (
    <div className="Map">
      {!initialLoad && <MapHeader map={map} />}
      <LoadMap
        map={map}
        setMap={setMap}
        initialLoad={initialLoad}
        setInitialLoad={setInitialLoad}
      />
      <ToasterMsg />
      {initialLoad && (
        <>
          <div className="bgc" />
          <Loading />
        </>
      )}
    </div>
  );
};

export default memo(Map);
