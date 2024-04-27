import { MdMyLocation } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { addressState } from "@store/map/atoms";
import ping from "@assets/images/ping.webp";
import "@styles/map/MapHeader.scss";

interface Props {
  updateMyLocation: () => void;
}

const MapHeader = ({ updateMyLocation }: Props) => {
  const address = useRecoilValue(addressState);

  return (
    <div className="MapHeader">
      <div className="header">
        <div className="blank"></div>
        <div className="title">
          <img src={ping} alt="" />
          <div>{address}</div>
        </div>
        <div className="gps">
          <MdMyLocation onClick={updateMyLocation} />
        </div>
      </div>
    </div>
  );
};

export default MapHeader;
