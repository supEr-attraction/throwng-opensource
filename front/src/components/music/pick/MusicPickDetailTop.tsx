import Header from "@components/Header";
import whiteBox from "@assets/images/whiteBox.webp";
import "@styles/music/pick/MusicPickDetailTop.scss";
import { useEffect, useRef, useState } from "react";

interface Props {
  marker: {
    throwId: number;
    title: string;
    artist: string;
    albumImage: string;
    itemImage: string;
    content: string;
    thrownDate: string;
  };
}

const MusicPickDetailTop = ({ marker }: Props) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      console.log(textRef.current);
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = textRef.current.clientWidth;

      console.log(textWidth);
      console.log(containerWidth);

      if (textWidth > containerWidth) {
        setIsScrollNeeded(true);
      } else {
        setIsScrollNeeded(false);
      }
    }
  }, []); // 텍스트가 변경될 때마다 효과를 재실행

  return (
    <div className="MusicPickDetailTop">
      <img className="album-image" src={marker.albumImage} alt="" />
      <div className="cover">
        <div className="black-cover" />
        <div className="black-gradient" />
        <div className="content">
          <Header />
          <div className="content-bottom">
            <div>
              {/* <div
                className={`title ${isScrollNeeded ? "ani" : ""}`}
                ref={textRef}
              >
                <div className={`${isScrollNeeded ? "animated" : ""}`}>
                  {marker.title}
                </div>
              </div> */}
              <div className={`title`}>
                <div
                  ref={textRef}
                  className={`scrolling-text ${
                    isScrollNeeded ? "animated" : ""
                  }`}
                >
                  {marker.title}
                </div>
              </div>
              <div className="artist">{marker.artist}</div>
            </div>
            <img
              src={marker.itemImage}
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
