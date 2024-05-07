import { useRecoilValue } from "recoil";
import {
  addressState,
  centerState,
  mapCenterAddressState,
} from "@store/map/atoms";
import { MdMyLocation } from "react-icons/md";
import ping from "@assets/images/ping.webp";
import "@styles/map/MapHeader.scss";

interface Props {
  returnMyLocation: () => void;
}

const MapHeader = ({ returnMyLocation }: Props) => {
  const address = useRecoilValue(addressState);
  const mapCenterAddress = useRecoilValue(mapCenterAddressState);
  const center = useRecoilValue(centerState);

  return (
    <div className="MapHeader">
      <div className="header">
        <div className="blank" />
        <div className="title">
          <img src={ping} alt="" />
          <div>{center ? address.regionName : mapCenterAddress.regionName}</div>
        </div>
        <div className="gps" onClick={returnMyLocation}>
          <MdMyLocation className={`${center ? "true" : "false"}`} />
        </div>
      </div>
    </div>
  );
};

export default MapHeader;
