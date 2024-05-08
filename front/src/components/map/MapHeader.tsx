import { memo } from "react";
import { useRecoilValue } from "recoil";
import {
  addressState,
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
  const address = useRecoilValue(addressState);
  const mapCenterAddress = useRecoilValue(mapCenterAddressState);
  const center = useRecoilValue(centerState);

  const currentAddress = center
    ? address.regionName
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
