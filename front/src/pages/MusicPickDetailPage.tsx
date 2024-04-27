// import { axiosApi } from "@/utils/common";
import MusicPickDetailBottom from "@components/music/pick/MusicPickDetailBottom";
import MusicPickDetailTop from "@components/music/pick/MusicPickDetailTop";
import { optionModalState, reportModalState } from "@store/music/pick/atoms";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useResetRecoilState } from "recoil";
import "@styles/music/pick/MusicPickDetailPage.scss";
// import { musicInfoState } from "@store/map/atoms";

const MusicPickDetailPage = () => {
  const resetOptionModal = useResetRecoilState(optionModalState);
  const resetReportModal = useResetRecoilState(reportModalState);
  // const setMusicInfo = useSetRecoilState(musicInfoState);

  const { id } = useParams();

  // const musicDetail = async () => {
  //   const { data } = await axiosApi().get(`/music/thrown/${id}`);
  //   setMusicInfo(data);
  // };

  useEffect(() => {
    resetOptionModal();
    resetReportModal();
    // musicDetail();
  }, []);

  return (
    <div className="MusicPickDetailPage">
      <MusicPickDetailTop />
      <MusicPickDetailBottom id={id!} />
    </div>
  );
};

export default MusicPickDetailPage;
