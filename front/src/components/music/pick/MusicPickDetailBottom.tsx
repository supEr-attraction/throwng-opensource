import { SlOptionsVertical } from "react-icons/sl";
import dayjs from "dayjs";
import youtubeMusic from "@assets/images/youtubeMusic.webp";
import "@styles/music/pick/MusicPickDetailBottom.scss";

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

const MusicPickDetailBottom = ({ marker }: Props) => {
  const date = dayjs(marker.thrownDate);

  return (
    <div className="MusicPickDetailBottom">
      <div className="top">
        <div className="option">
          <SlOptionsVertical />
        </div>
        <div className="content">{marker.content}</div>
        <div className="date">{date.format("YY.MM.DD")}</div>
      </div>
      <div className="bottom">
        <button className="listen">
          <img src={youtubeMusic} alt="" />
          <div>바로 듣기</div>
        </button>
        <button className="pick">줍기</button>
      </div>
    </div>
  );
};

export default MusicPickDetailBottom;
