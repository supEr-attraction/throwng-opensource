import {
  musicPickImageState,
  musicPickMusicInfoState,
} from "@store/music/pick/selectors";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { FaHeart } from "react-icons/fa";

const MusicInfoContent = () => {
  const { itemImage, albumImage } = useRecoilValue(musicPickImageState);
  const { title, artist, otherPickedCount } = useRecoilValue(
    musicPickMusicInfoState
  );
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

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
    <div className="content-bottom">
      <div className="music-info">
        <div className={`title`}>
          <div
            ref={textRef}
            className={`scrolling-text ${isScrollNeeded ? "animated" : ""}`}
          >
            {title}
          </div>
        </div>
        <div className="artist">{artist}</div>
      </div>
      <div className="music-cover">
        <img
          src={itemImage || albumImage}
          onError={(e) => {
            e.currentTarget.src = albumImage;
          }}
        />
        <div className="heart">
          <FaHeart />
          <div>{otherPickedCount}</div>
        </div>
      </div>
    </div>
  );
};

export default MusicInfoContent;
