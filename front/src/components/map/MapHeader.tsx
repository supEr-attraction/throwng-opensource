import { memo } from "react";
import { useRecoilValue } from "recoil";
import {
  myAddressState,
  centerState,
  mapCenterAddressState,
} from "@store/map/atoms";
import AddressContent from "./AddressContent";
import GpsBtn from "./GpsBtn";
import "@styles/map/MapHeader.scss";

interface Props {
  map: google.maps.Map | null;
}

const MapHeader = ({ map }: Props) => {
  const myAddress = useRecoilValue(myAddressState);
  const mapCenterAddress = useRecoilValue(mapCenterAddressState);
  const center = useRecoilValue(centerState);

  const currentAddress = center
    ? myAddress.regionName
    : mapCenterAddress.regionName;

  return (
    <div className="MapHeader">
      <div className="header">
        <div className="blank" />
        <AddressContent address={currentAddress} />
        <GpsBtn map={map} />
      </div>
    </div>
  );
};

export default memo(MapHeader);
