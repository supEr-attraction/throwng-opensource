import Header from "@components/Header";
import whiteBox from "@assets/images/whiteBox.webp";
import "@styles/musicDrop/MusicDropHeader.scss";
import { useState, useRef, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { musicDropImage, userImageURL } from "@store/musicSearch/atoms";
import { useRecoilValue } from "recoil";
import { selectMusic } from "@store/music/drop/atoms";
import { postImageUpload } from "@services/musicSearchApi/MusicSearchApi";
import { ImVolumeMedium } from "react-icons/im";
import { ImVolumeMute2 } from "react-icons/im";

const MusicDropHeader = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);
  const [imagePreview, setImagePreview] = useRecoilState(musicDropImage);
  const songInfo = useRecoilValue(selectMusic);
  const setUserImageUrl = useSetRecoilState(userImageURL);
  const resetSetImagePreview = useResetRecoilState(musicDropImage);
  const resetSetUserImageUrl = useResetRecoilState(userImageURL);
  const [isBgmPlay, setIsBgmPlay] = useState(true)
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
    resetSetImagePreview();
    resetSetUserImageUrl();
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio play failed", error);
        setIsBgmPlay(false);
      });
    }
  }, []);

  const handleFileButtonClick = () => {
    fileRef.current!.click();
  };

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5000000) {
        alert("사진의 용량이 너무 커요. 다른 사진을 사용해 주세요.");
        resetSetImagePreview();
        resetSetUserImageUrl();
        return;
      } else {
        setImagePreview(URL.createObjectURL(file));
        const data = await postImageUpload(file);
        setUserImageUrl(data);
      }
    }
  };

  return (
    <div className="MusicDropHeader">
      <img className="album-image" src={songInfo.albumImage} alt="" />
      <div className="cover">
        <div className="black-cover" />
        <div className="black-gradient" />
        <div className="content">
          <div className="header">
            <Header />
            <div className="volume" onClick={handleChangeBgm}>
                {isBgmPlay ? <ImVolumeMedium /> : <ImVolumeMute2 />}
                <audio 
                  ref={audioRef} 
                  src="https://p.scdn.co/mp3-preview/f480dd07f843eb0ef125a609bb947ea2bcf5b215?cid=cfe923b2d660439caf2b557b21f31221"
                  // src={songInfo.prelisten}
                ></audio>
            </div>
          </div>
          <div className="content-bottom">
            <div className="info">
              <div className={`title`}>
                <div
                  ref={textRef}
                  className={`scrolling-text ${
                    isScrollNeeded ? "animated" : ""
                  }`}
                >
                  {songInfo.title}
                </div>
              </div>
              <div className="artist">{songInfo.artist}</div>
            </div>
            <div className="upload-image-div" onClick={handleFileButtonClick}>
              <img
                src={imagePreview || whiteBox}
                alt=""
                className="upload-image"
                onError={(e) => {
                  e.currentTarget.src = whiteBox;
                }}
              />
              {!imagePreview && <IoCloudUploadOutline />}
            </div>
            <input
              type="file"
              ref={fileRef}
              hidden={true}
              onChange={handleFileChange}
              className="image-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicDropHeader;
