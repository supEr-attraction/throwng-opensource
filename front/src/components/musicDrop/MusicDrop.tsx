import Header from "@components/Header"
import React, { useState, useRef, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import "@styles/musicDrop/MusicDrop.scss"
import { useLocation } from "react-router-dom";

const MusicDrop = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const inputEl = useRef<HTMLTextAreaElement>(null);
  const location = useLocation();
  const backgroundImage = location.state!.image

  useEffect(() => {
    inputEl.current!.focus();
  }, []);

  const textOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 50) {
      setText(e.target.value);
      setCount(e.target.value.length);
    } else {
      alert("텍스트는 최대 50자까지 입력 가능합니다.");
    }
  }

  const handleFileButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    fileRef.current!.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Header />
      <div className="MusicDrop">
        <div className="drop-bg" style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)), url(${backgroundImage})`}}>
          <div className="flex-div">
            <div className="upload-image-div" onClick={handleFileButtonClick}>
              {imagePreview && (
                <img src={imagePreview} className="upload-image"/>
              )}
              {!imagePreview && <IoCloudUploadOutline />}
            </div>
            {imagePreview && (
              <div className="reselect-image" onClick={handleFileButtonClick}>이미지 다시 선택하기</div>
            )}
          </div>
          
          <div>
            <input
              type="file"
              ref={fileRef}
              hidden={true}
              onChange={handleFileChange}
              className="image-input"
            />
          </div>
        </div>

        <div className="body">
          <div className="header">
            <p><span>광산구 하남동</span>에</p>
            음악을 두고 갈까요?
          </div>

          <div className="input-div">
            <textarea
              onChange={textOnChange}
              placeholder="노래, 현재 감정, 상황, 관련 에피소드, 거리, 가수 등 떠오르는 말을 적어보세요."
              value={text}
              maxLength={50}
              className="input-area"
              ref={inputEl}
            />
            <div className="input-count">{count}/50</div>
          </div>

          <div className="waring-div">
            <div className="warning-msg">텍스트 및 사진은 생략이 가능하며 욕설, 성희롱, 비방과 같은 내용은 삭제됩니다.</div>
          </div>

          <div className="put-btn-div">
            <button className="put-btn">나.. 너.. 쓰롱한다..❤</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default MusicDrop