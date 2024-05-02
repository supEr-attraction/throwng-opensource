import { MdMyLocation } from "react-icons/md";
import { useRecoilValue } from "recoil";
import {
  addressState,
  centerState,
  mapCenterAddressState,
} from "@store/map/atoms";
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
        <div className="blank"></div>
        <div className="title">
          <img src={ping} alt="" />
          <div>{center ? address : mapCenterAddress}</div>
        </div>
        <div className="gps">
          <MdMyLocation
            className={`${center ? "true" : "false"}`}
            onClick={returnMyLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default MapHeader;
