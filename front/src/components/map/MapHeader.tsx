import ping from "@assets/images/ping.webp";
// import gps from "@assets/images/gps.webp";
import { MdMyLocation } from "react-icons/md";
import "@styles/map/MapHeader.scss";

interface Props {
  address: string;
  a: (currentLocation: { lat: number; lng: number }) => void;
}

const MapHeader = ({ address, a }: Props) => {
  const onClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          a(currentLocation);
          console.log(1);
        },
        () => {
          console.error("Error fetching location");
        }
      );
    }
  };

  return (
    <div className="MapHeader">
      <div className="header">
        <div className="blank"></div>
        <div className="title">
          <img src={ping} alt="" />
          <div>{address}</div>
        </div>
        <div className="gps">
          <MdMyLocation onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default MapHeader;
