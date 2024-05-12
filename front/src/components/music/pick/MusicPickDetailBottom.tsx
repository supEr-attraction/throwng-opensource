import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { radiusActiveIdState } from "@store/map/atoms";
import {
  musicPickStatusState,
  musicPickMusicInfoState,
} from "@store/music/pick/selectors";
import { postMusicPick } from "@services/musicPickApi";
import MusicComment from "@components/music/pick/MusicComment";
import youtubeMusic from "@assets/images/youtubeMusic.webp";
import "@styles/music/pick/MusicPickDetailBottom.scss";

const MusicPickDetailBottom = () => {
  const { throwId, pickupStatus } = useRecoilValue(musicPickStatusState);
  const { title, artist } = useRecoilValue(musicPickMusicInfoState);
  const setRadiusActiveId = useSetRecoilState(radiusActiveIdState);

  const navigate = useNavigate();

  const pickMusic = async () => {
    try {
      await postMusicPick(throwId);
      setRadiusActiveId(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const listenSong = () => {
    const musicName = encodeURIComponent(title);
    const artistName = encodeURIComponent(artist);
    const youtubeMusicWebURL = `https://music.youtube.com/search?q=${musicName}-${artistName}`;
    window.location.href = youtubeMusicWebURL;
  };

  return (
    <div className="MusicPickDetailBottom">
      <MusicComment />
      <div className="bottom">
        <button className="listen" onClick={listenSong}>
          <img src={youtubeMusic} alt="" />
          <div>바로 듣기</div>
        </button>
        <button
          className={`pick ${pickupStatus && "disable"}`}
          onClick={pickMusic}
          disabled={pickupStatus}
        >
          줍기
        </button>
      </div>
    </div>
  );
};

export default memo(MusicPickDetailBottom);
