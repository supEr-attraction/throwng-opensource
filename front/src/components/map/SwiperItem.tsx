import { memo } from "react";
import { Marker } from "../../types/mapType";

interface Props {
  marker: Marker;
}

const SwiperItem = ({ marker }: Props) => {
  return (
    <div className="SwiperItem">
      <img src={marker.albumImage} loading="lazy" decoding="async" />
      <div className="content">
        <div className="title">{marker.songTitle}</div>
        <div className="singer">{marker.artistName}</div>
      </div>
    </div>
  );
};

export default memo(SwiperItem);
