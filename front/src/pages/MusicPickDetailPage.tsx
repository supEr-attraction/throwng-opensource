import MusicPickDetailBottom from "@components/music/pick/MusicPickDetailBottom";
import MusicPickDetailTop from "@components/music/pick/MusicPickDetailTop";
import { optionModalState, reportModalState } from "@store/music/pick/atoms";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useResetRecoilState } from "recoil";
import { getMusicDetails } from "@services/musicPickApi";
import { MusicInfo } from "../types/mapType";
import "@styles/music/pick/MusicPickDetailPage.scss";
import Loading from "@components/Loading";

const MusicPickDetailPage = () => {
  const resetOptionModal = useResetRecoilState(optionModalState);
  const resetReportModal = useResetRecoilState(reportModalState);
  const [musicInfo, setMusicInfo] = useState<MusicInfo>({
    address: "",
    albumImage: "",
    artist: "",
    content: "",
    itemImage: "",
    pickupStatus: false,
    throwId: 0,
    thrownDate: "",
    title: "",
  });

  const { id } = useParams();

  const musicDetail = async () => {
    try {
      const data = await getMusicDetails(id!);
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
      {musicInfo.artist ? (
        <>
          <MusicPickDetailTop musicInfo={musicInfo} />
          <MusicPickDetailBottom musicInfo={musicInfo} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MusicPickDetailPage;
