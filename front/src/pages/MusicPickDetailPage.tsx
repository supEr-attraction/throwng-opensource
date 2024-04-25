import MusicPickDetailBottom from "@components/music/pick/MusicPickDetailBottom";
import MusicPickDetailTop from "@components/music/pick/MusicPickDetailTop";
import { optionModalState, reportModalState } from "@store/music/pick/atoms";
import "@styles/music/pick/MusicPickDetailPage.scss";
import { useEffect } from "react";
import { useResetRecoilState } from "recoil";

const MusicPickDetailPage = () => {
  const resetOptionModal = useResetRecoilState(optionModalState);
  const resetReportModal = useResetRecoilState(reportModalState);

  const marker = {
    throwId: 1,
    title: "I Don't Think That I Like Her Her",
    artist: "Charlie Puth",
    albumImage:
      "https://i.namu.wiki/i/gQq7yL2gbO3_EWZJvfmoFynKLj6fPk76XkIXuyyy8B2HKvK4U_O9db0j8oMUUFy3yrGCZFBazNVK9iSYwjNyEw.webp",
    itemImage: "itemImageUrl",
    content: "봄에 비가 오면 생각나는 노래 ☔ ",
    thrownDate: "2024-04-24T19:49:30",
  };

  useEffect(() => {
    resetOptionModal();
    resetReportModal();
  }, []);

  return (
    <div className="MusicPickDetailPage">
      <MusicPickDetailTop marker={marker} />
      <MusicPickDetailBottom marker={marker} />
    </div>
  );
};

export default MusicPickDetailPage;
