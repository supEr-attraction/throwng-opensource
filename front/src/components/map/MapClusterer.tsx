import { CLUSTER_STYLES } from "@constants/map";
import { MarkerClustererF } from "@react-google-maps/api";
import { markersState } from "@store/map/atoms";
import { useRecoilValue } from "recoil";
import MusicMarkerItem from "./MusicMarkerItem";

const MapClusterer = ({
  map,
  zoomLevel,
}: {
  map: google.maps.Map | null;
  zoomLevel: number;
}) => {
  const markers = useRecoilValue(markersState);

  const calculateGridSize = () => {
    switch (zoomLevel) {
      case 22:
        return 1;
      case 21:
        return 3;
      case 20:
        return 5;
      case 19:
        return 7;
      case 18:
        return 9;
      case 17:
        return 11;
      case 16:
        return 13;
      case 15:
        return 15;
      case 14:
        return 17;
      case 13:
        return 19;
      case 12:
        return 21;
      case 11:
        return 23;
      case 10:
        return 25;
      case 9:
        return 27;
      case 8:
        return 29;
      default:
        return 31;
    }
  };

  const gridSize = calculateGridSize();

  return (
    <>
      <MarkerClustererF
        averageCenter={true}
        gridSize={gridSize}
        styles={CLUSTER_STYLES}
        clusterClass="common_cluster"
      >
        {(clusterer) => (
          <>
            {markers.map((marker) => (
              <MusicMarkerItem
                key={marker.itemId}
                marker={marker}
                clusterer={clusterer}
              />
            ))}
          </>
        )}
      </MarkerClustererF>
      {/* {markers.map((marker) => (
            <MusicMarkerItem key={marker.itemId} marker={marker} />
          ))} */}
    </>
  );
};

export default MapClusterer;
