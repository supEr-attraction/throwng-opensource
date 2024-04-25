import Header from "@components/Header";
import whiteBox from "@assets/images/whiteBox.webp";
import "@styles/musicDrop/MusicDropHeader.scss";
import { Song } from "../../types/songType";
import { useState, useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface Props {
  songInfo: Song;
}

const MusicDropHeader = ({ songInfo }: Props) => {
  const [imagePreview, setImagePreview] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileRef.current!.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  return (
    <div className="MusicDropHeader">
      <div className="album-image-container">
        <img className="album-image" src={songInfo.image} alt="" />
      </div>
      <div className="cover">
        <div className="black-cover" />
        <div className="black-gradient" />
        <div className="content">
          <Header />
          <div className="content-bottom">
            <div>
              <div className={`title`}>{songInfo.title}</div>
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
              <div className="reselect-image">이미지 다시 선택하기</div>
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