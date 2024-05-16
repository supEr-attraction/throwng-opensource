import { memo, useState } from "react";
import ToasterMsg from "@components/ToasterMsg";
import MapHeader from "./MapHeader";
import Loading from "@components/Loading";
import useLocationWatcher from "@hooks/map/useLocationWatcher";
import MapBottom from "./MapBottom";
import MapContainer from "./MapContainer";
import "@styles/map/Map.scss";

const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useLocationWatcher(map, initialLoad);

  return (
    <div className="Map">
      {!initialLoad && <MapHeader map={map} />}
      <MapContainer
        map={map}
        setMap={setMap}
        initialLoad={initialLoad}
        setInitialLoad={setInitialLoad}
      />
      <MapBottom />
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
