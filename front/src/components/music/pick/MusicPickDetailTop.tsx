import Header from "@components/Header";
import { useEffect, useRef, useState } from "react";
import "@styles/music/pick/MusicPickDetailTop.scss";
import { MusicInfo } from "../../../types/mapType";
import { ImVolumeMedium } from "react-icons/im";
import { ImVolumeMute2 } from "react-icons/im";

const MusicPickDetailTop = ({ musicInfo }: { musicInfo: MusicInfo }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);
  const [isBgmPlay, setIsBgmPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio play failed", error);
        setIsBgmPlay(false);
      });
    }
  }, []);

  const handleChangeBgm = () => {
    if (audioRef.current) {
      if (isBgmPlay) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsBgmPlay(!isBgmPlay);
    }
  };

  return (
    <div className="MusicPickDetailTop">
      <img className="album-image" src={musicInfo.albumImage} alt="" />
      <div className="cover">
        <div className="black-cover" />
        <div className="black-gradient" />
        <div className="content">
          <Header centerText={musicInfo.address} type="address" />
          {musicInfo.previewUrl && (
            <div className="volume" onClick={handleChangeBgm}>
              {isBgmPlay ? <ImVolumeMedium /> : <ImVolumeMute2 />}
              <audio ref={audioRef} src={musicInfo.previewUrl}></audio>
            </div>
            )}
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
