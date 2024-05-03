import Header from "@components/Header";
import { useEffect, useRef, useState } from "react";
import "@styles/music/pick/MusicPickDetailTop.scss";
import { MusicInfo } from "../../../types/mapType";

const MusicPickDetailTop = ({ musicInfo }: { musicInfo: MusicInfo }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = textRef.current.clientWidth;

      if (textWidth > containerWidth) {
        setIsScrollNeeded(true);
      } else {
        setIsScrollNeeded(false);
      }
    }
  }, []);

  return (
    <div className="MusicPickDetailTop">
      <img className="album-image" src={musicInfo.albumImage} alt="" />
      <div className="cover">
        <div className="black-cover" />
        <div className="black-gradient" />
        <div className="content">
          <Header centerText={musicInfo.address} type="address" />
          <div className="content-bottom">
            <div>
              <div className={`title`}>
                <div
                  ref={textRef}
                  className={`scrolling-text ${
                    isScrollNeeded ? "animated" : ""
                  }`}
                >
                  {musicInfo.title}
                </div>
              </div>
              <div className="artist">{musicInfo.artist}</div>
            </div>
            <img
              src={musicInfo.itemImage || musicInfo.albumImage}
              alt=""
              onError={(e) => {
                e.currentTarget.src = musicInfo.albumImage;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPickDetailTop;
