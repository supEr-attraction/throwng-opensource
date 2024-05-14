import { memo } from "react";
import ping from "@assets/images/ping.webp";
import "@styles/map/AddressContent.scss";

const AddressContent = ({ address }: { address: string }) => {
  return (
    <div className="AddressContent">
      <img src={ping} alt="" />
      <div>{address}</div>
    </div>
  );
};

export default memo(AddressContent);
