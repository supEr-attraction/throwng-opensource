import Header from "@components/Header";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { musicInfoState } from "@store/music/pick/atoms";
import whiteBox from "@assets/images/whiteBox.webp";
import "@styles/music/pick/MusicPickDetailTop.scss";

const MusicPickDetailTop = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);
  const { title, artist, albumImage, itemImage, address } =
    useRecoilValue(musicInfoState);

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
      <img className="album-image" src={albumImage} alt="" />
      <div className="cover">
        {/* <div className="black-cover" /> */}
        <div className="black-gradient" />
        <div className="content">
          <Header centerText={address} type="address" />
          <div className="content-bottom">
            <div>
              <div className={`title`}>
                <div
                  ref={textRef}
                  className={`scrolling-text ${
                    isScrollNeeded ? "animated" : ""
                  }`}
                >
                  {title}
                </div>
              </div>
              <div className="artist">{artist}</div>
            </div>
            <img
              // src="////s"
              src={itemImage}
              alt=""
              onError={(e) => {
                e.currentTarget.src = whiteBox;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPickDetailTop;
