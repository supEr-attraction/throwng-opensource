import Header from "@components/Header";
import whiteBox from "@assets/images/whiteBox.webp";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { addressState, swiperState } from "@store/map/atoms";
import "@styles/music/pick/MusicPickDetailTop.scss";

const MusicPickDetailTop = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);
  const resetSwiper = useResetRecoilState(swiperState);
  const address = useRecoilValue(addressState);
  // const musicInfo = useRecoilValue(musicInfoState);
  const musicInfo = {
    throwId: 1,
    title: "I Don't Think That I Like Her Her",
    artist: "Charlie Puth",
    albumImage:
      "https://i.namu.wiki/i/gQq7yL2gbO3_EWZJvfmoFynKLj6fPk76XkIXuyyy8B2HKvK4U_O9db0j8oMUUFy3yrGCZFBazNVK9iSYwjNyEw.webp",
    itemImage: "itemImageUrl",
    content: "봄에 비가 오면 생각나는 노래 ☔ ",
    thrownDate: "2024-04-24T19:49:30",
  };

  useEffect(() => {
    if (textRef.current) {
      console.log(textRef.current);
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
          <Header func={resetSwiper} centerText={address} />
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
                  {musicInfo.title}
                </div>
              </div>
              <div className="artist">{musicInfo.artist}</div>
            </div>
            <img
              src={musicInfo.itemImage}
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
