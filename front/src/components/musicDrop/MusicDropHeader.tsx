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
import heic2any from "heic2any";
import Loading from "@components/Loading";
import { toastMsg } from "@/utils/toastMsg";

const MusicDropHeader = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);
  const [imagePreview, setImagePreview] = useRecoilState(musicDropImage);
  const songInfo = useRecoilValue(selectMusic);
  const setUserImageUrl = useSetRecoilState(userImageURL);
  const resetSetImagePreview = useResetRecoilState(musicDropImage);
  const resetSetUserImageUrl = useResetRecoilState(userImageURL);
  const [isBgmPlay, setIsBgmPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      let file = e.target.files[0];
      if (file.size > 5000000) {
        toastMsg("사진의 용량이 너무 커요. 다른 사진을 사용해 주세요.");
        resetSetImagePreview();
        resetSetUserImageUrl();
        setIsLoading(false);
        return;
      } else {
        if (file.type === "") {
          try {
            const convertedBlob = await heic2any({
              blob: file,
              toType: "image/jpeg",
            });
            if (convertedBlob instanceof Blob) {
              file = new File(
                [convertedBlob],
                file.name.replace(/^data:image\/jpeg;base64,/, ""),
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }
              );
            }
          } catch (error) {
            toastMsg(
              "사진의 유형이 올바르지 않습니다. 다른 사진을 사용해 주세요."
            );
            return;
          }
        }
        setImagePreview(URL.createObjectURL(file));
        const data = await postImageUpload(file);
        setUserImageUrl(data);
      }
      setIsLoading(false);
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
            {songInfo.previewUrl && (
              <div className="volume" onClick={handleChangeBgm}>
                {isBgmPlay ? <ImVolumeMedium /> : <ImVolumeMute2 />}
                <audio ref={audioRef} src={songInfo.previewUrl}></audio>
              </div>
            )}
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
            {isLoading ? (
              <Loading />
            ) : (
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
            )}
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
