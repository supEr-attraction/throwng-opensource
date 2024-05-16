import { memo } from "react";
import ping from "@assets/images/ping.webp";
import "@styles/map/AddressContent.scss";

interface Props {
  address: string;
}

const AddressContent = ({ address }: Props) => {
  return (
    <div className="AddressContent">
      <img src={ping} alt="" loading="lazy" decoding="async" />
      <div>{address}</div>
    </div>
  );
};

export default memo(AddressContent);
