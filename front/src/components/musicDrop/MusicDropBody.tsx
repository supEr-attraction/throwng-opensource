import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { addressState, locationState } from "@store/map/atoms";
import "@styles/musicDrop/MusicDrop.scss";

const MusicDropBody = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const inputEl = useRef<HTMLTextAreaElement>(null);
  const myLocation = useRecoilValue(locationState);
  const myAddress = useRecoilValue(addressState);

  const textOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 50) {
      setText(e.target.value);
      setCount(e.target.value.length);
    } else {
      alert("텍스트는 최대 50자까지 입력 가능합니다.");
    }
  };

  const postThrownSong = () => {
    console.log(`Latitude: ${myLocation.lat}, Longitude: ${myLocation.lng}`);
    console.log(myAddress)
  };

  return (
    <div className="MusicDrop">
      <div className="body">
        <div className="header">
          <p>
            <span>{myAddress}</span>에
          </p>
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
          <div className="warning-msg">
            텍스트 및 사진은 생략이 가능하며 욕설, 성희롱, 비방과 같은 내용은
            삭제됩니다.
          </div>
        </div>

        <div className="put-btn-div">
          <button className="put-btn" onClick={postThrownSong}>
            나.. 너.. 쓰롱한다..❤
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicDropBody;
