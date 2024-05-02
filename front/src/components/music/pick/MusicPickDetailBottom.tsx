import { SlOptionsVertical } from "react-icons/sl";
import dayjs from "dayjs";
import OptionModal from "./OptionModal";
import ReportModal from "@components/music/pick/ReportModal";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { optionModalState, reportModalState } from "@store/music/pick/atoms";
import { ToasterMsg } from "@components/ToasterMsg";
import { useNavigate } from "react-router-dom";
import youtubeMusic from "@assets/images/youtubeMusic.webp";
import { postMusicPick } from "@services/musicPickApi";
import "@styles/music/pick/MusicPickDetailBottom.scss";
import { activeMarkerState } from "@store/map/atoms";
import { MusicInfo } from "../../../types/mapType";

const MusicPickDetailBottom = ({ musicInfo }: { musicInfo: MusicInfo }) => {
  const reportModal = useRecoilValue(reportModalState);
  const [optionModal, setOptionModal] = useRecoilState(optionModalState);
  const resetActiveMarkerId = useResetRecoilState(activeMarkerState);

  const navigate = useNavigate();

  const date = dayjs(musicInfo.thrownDate);

  const pickMusic = async () => {
    try {
      await postMusicPick(musicInfo.throwId);
      resetActiveMarkerId();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const listenSong = () => {
    const musicName = encodeURIComponent(musicInfo.title);
    const artistName = encodeURIComponent(musicInfo.artist);
    // const youtubeMusicWebURL = `https://music.youtube.com/watch?v=gwuCZYJdnT8`;
    const youtubeMusicWebURL = `https://music.youtube.com/search?q=${musicName}-${artistName}`;

    // 유튜브뮤직 앱으로 시도
    window.location.href = youtubeMusicWebURL;

    // 앱으로의 리다이렉션이 실패할 경우를 대비해, 일정 시간 후에 웹 URL로 다시 시도
  };

  return (
    <>
      <div className="MusicPickDetailBottom">
        <div className="top">
          <div className="option">
            <SlOptionsVertical onClick={() => setOptionModal(true)} />
          </div>
          <div className="content">{musicInfo.content}</div>
          <div className="date">{date.format("YY.MM.DD")}</div>
        </div>
        <div className="bottom">
          <button className="listen" onClick={listenSong}>
            <img src={youtubeMusic} alt="" />
            <div>바로 듣기</div>
          </button>
          <button
            className={`pick ${musicInfo.pickupStatus && "disable"}`}
            onClick={pickMusic}
            disabled={musicInfo.pickupStatus}
          >
            줍기
          </button>
        </div>
      </div>
      {optionModal && <OptionModal />}
      {reportModal && <ReportModal />}
      <ToasterMsg />
    </>
  );
};

export default MusicPickDetailBottom;
