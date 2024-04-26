import { SlOptionsVertical } from "react-icons/sl";
import dayjs from "dayjs";
import youtubeMusic from "@assets/images/youtubeMusic.webp";
import OptionModal from "./OptionModal";
import ReportModal from "@components/music/pick/ReportModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { optionModalState, reportModalState } from "@store/music/pick/atoms";
import { ToasterMsg } from "@components/ToasterMsg";
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
  const reportModal = useRecoilValue(reportModalState);
  const [optionModal, setOptionModal] = useRecoilState(optionModalState);

  return (
    <>
      <div className="MusicPickDetailBottom">
        <div className="top">
          <div className="option">
            <SlOptionsVertical onClick={() => setOptionModal(true)} />
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
      {optionModal && <OptionModal />}
      {reportModal && <ReportModal />}
      <ToasterMsg />
    </>
  );
};

export default MusicPickDetailBottom;
