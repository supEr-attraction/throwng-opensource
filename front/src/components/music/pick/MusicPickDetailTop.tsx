import { memo } from "react";
import { useRecoilValue } from "recoil";
import { musicPickHeaderState } from "@store/music/pick/selectors";
import Header from "@components/Header";
import MusicInfoContent from "@components/music/pick/MusicInfoContent";
import AudioPlayer from "@components/music/common/AudioPlayer";
import "@styles/music/pick/MusicPickDetailTop.scss";
import BlackGradient from "../common/BlackGradient";

const MusicPickDetailTop = () => {
  const { address, albumImage, previewUrl } =
    useRecoilValue(musicPickHeaderState);

  return (
    <div className="MusicPickDetailTop">
      <img className="album-image" src={albumImage} alt="" />
      <div className="cover">
        <BlackGradient />
        <div className="content">
          <Header centerText={address} type="address" />
          {previewUrl && <AudioPlayer previewUrl={previewUrl} />}
          <MusicInfoContent />
        </div>
      </div>
    </div>
  );
};

export default memo(MusicPickDetailTop);
