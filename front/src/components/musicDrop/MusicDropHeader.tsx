import Header from "@components/Header";
import whiteBox from "@assets/images/whiteBox.webp";
import "@styles/musicDrop/MusicDropHeader.scss";
import { useState, useRef, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { musicDropImage, userImage } from "@store/musicSearch/atoms";
import { useRecoilValue } from 'recoil';
import { selectMusic } from "@store/music/drop/atoms";
import { useResetRecoilState } from 'recoil';


const MusicDropHeader = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);
  const [imagePreview, setImagePreview] = useRecoilState(musicDropImage);
  const setUserImage = useSetRecoilState(userImage);
  const songInfo = useRecoilValue(selectMusic);
  const resetUserImage = useResetRecoilState(userImage)

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
    setImagePreview('')
    resetUserImage()
  }, []);

  const handleFileButtonClick = () => {
    fileRef.current!.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserImage(file)
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  return (
    <div className="MusicDropHeader">
      <div className="album-image-container">
        <img className="album-image" src={songInfo.albumImage} alt="" />
      </div>
      <div className="cover">
        <div className="black-cover" />
        <div className="black-gradient" />
        <div className="content">
          <Header />
          <div className="content-bottom">
            <div>
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
            {imagePreview && (
              <div className="reselect-image" onClick={handleFileButtonClick}>이미지 다시 선택하기</div>
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