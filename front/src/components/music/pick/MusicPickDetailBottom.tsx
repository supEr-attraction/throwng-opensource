import { SlOptionsVertical } from "react-icons/sl";
import dayjs from "dayjs";
import youtubeMusic from "@assets/images/youtubeMusic.webp";
import OptionModal from "./OptionModal";
import ReportModal from "@components/music/pick/ReportModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { optionModalState, reportModalState } from "@store/music/pick/atoms";
import { ToasterMsg } from "@components/ToasterMsg";
// import { musicInfoState } from "@store/map/atoms";
import { axiosApi } from "@/utils/common";
import { useNavigate } from "react-router-dom";
import "@styles/music/pick/MusicPickDetailBottom.scss";

const MusicPickDetailBottom = ({ id }: { id: string }) => {
  const reportModal = useRecoilValue(reportModalState);
  const [optionModal, setOptionModal] = useRecoilState(optionModalState);
  // const musicInfo = useRecoilValue(musicInfoState);
  const navigate = useNavigate();

  const musicInfo = {
    throwId: 1,
    title: "I Don't Think That I Like Her Her",
    artist: "Charlie Puth",
    albumImage:
      "https://i.namu.wiki/i/gQq7yL2gbO3_EWZJvfmoFynKLj6fPk76XkIXuyyy8B2HKvK4U_O9db0j8oMUUFy3yrGCZFBazNVK9iSYwjNyEw.webp",
    itemImage: "itemImageUrl",
    content: "봄에 비가 오면 생각나는 노래 ☔ ",
    thrownDate: "2024-04-24T19:49:30",
  };

  const date = dayjs(musicInfo.thrownDate);

  const pickMusic = async () => {
    try {
      const res = await axiosApi().post(`/music/pick/${id}`);
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
          <button className="listen">
            <img src={youtubeMusic} alt="" />
            <div>바로 듣기</div>
          </button>
          <button className="pick" onClick={pickMusic}>
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
