import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
  musicInfoState,
  optionModalState,
  reportModalState,
} from "@store/music/pick/atoms";
import { getMusicDetails } from "@services/musicPickApi";
import MusicPickDetailTop from "@components/music/pick/MusicPickDetailTop";
import MusicPickDetailBottom from "@components/music/pick/MusicPickDetailBottom";
import ToasterMsg from "@components/ToasterMsg";
import Loading from "@components/Loading";
import "@styles/music/pick/MusicPickDetailPage.scss";

const MusicPickDetailPage = () => {
  const [initialLoad, setInitialLoading] = useState(false);
  const setMusicInfo = useSetRecoilState(musicInfoState);
  const resetOptionModal = useResetRecoilState(optionModalState);
  const resetReportModal = useResetRecoilState(reportModalState);

  const { id } = useParams();

  const musicDetail = async () => {
    try {
      const data = await getMusicDetails(id!);
      setMusicInfo(data);
    } catch (error) {
      console.log(error);
    } finally {
      resetOptionModal();
      resetReportModal();
      setInitialLoading(true);
    }
  };

  useEffect(() => {
    musicDetail();
  }, []);

  return initialLoad ? (
    <div className="MusicPickDetailPage">
      <MusicPickDetailTop />
      <MusicPickDetailBottom />
      <ToasterMsg />
    </div>
  ) : (
    <Loading />
  );
};

export default MusicPickDetailPage;
