import MusicPickDetailBottom from "@components/music/pick/MusicPickDetailBottom";
import MusicPickDetailTop from "@components/music/pick/MusicPickDetailTop";
import { optionModalState, reportModalState } from "@store/music/pick/atoms";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { getMusicDetails } from "@services/musicPickApi";
import { musicInfoState } from "@store/music/pick/atoms";
import "@styles/music/pick/MusicPickDetailPage.scss";

const MusicPickDetailPage = () => {
  const resetOptionModal = useResetRecoilState(optionModalState);
  const resetReportModal = useResetRecoilState(reportModalState);
  const setMusicInfo = useSetRecoilState(musicInfoState);

  const { id } = useParams();

  const musicDetail = async () => {
    try {
      const data = await getMusicDetails(id!);
      console.log(data);
      setMusicInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    resetOptionModal();
    resetReportModal();
    musicDetail();
  }, []);

  return (
    <div className="MusicPickDetailPage">
      <MusicPickDetailTop />
      <MusicPickDetailBottom />
    </div>
  );
};

export default MusicPickDetailPage;
