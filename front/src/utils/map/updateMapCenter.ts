import { Dispatch, SetStateAction } from "react";
import { Location, Marker } from "../../types/mapType";
import fetchMusic from "@/utils/map/fetchMusic";

const updateMapCenter = (
  map: google.maps.Map,
  fetchAddress: (position: Location, type: string) => void,
  markers: Marker[],
  setMarkers: Dispatch<SetStateAction<Marker[]>>
) => {
  const mapCenter = map.getCenter();
  if (mapCenter) {
    const mapPosition = { lat: mapCenter.lat(), lng: mapCenter.lng() };
    if (mapPosition.lat !== 0 && mapPosition.lng !== 0) {
      fetchMusic(false, mapPosition, markers, setMarkers);
      fetchAddress(mapPosition, "mapCenter");
    }
  }
};

export default updateMapCenter;
