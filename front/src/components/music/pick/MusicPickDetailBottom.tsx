import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  couponUsageActiveIdState,
  radiusActiveIdState,
} from "@store/map/atoms";
import {
  musicPickStatusState,
  musicPickMusicInfoState,
} from "@store/music/pick/selectors";
import { postMusicPick } from "@services/musicPickApi";
import MusicComment from "@components/music/pick/MusicComment";
import listenSong from "@/utils/listenSong";
import "@styles/music/pick/MusicPickDetailBottom.scss";
import MusicPickBtn from "./MusicPickBtn";

const MusicPickDetailBottom = () => {
  const { throwId, pickupStatus } = useRecoilValue(musicPickStatusState);
  const { title, artist } = useRecoilValue(musicPickMusicInfoState);
  const setRadiusActiveId = useSetRecoilState(radiusActiveIdState);
  const setCouponUsageActiveIdState = useSetRecoilState(
    couponUsageActiveIdState
  );

  const navigate = useNavigate();

  const pickMusic = async () => {
    try {
      await postMusicPick(throwId);
      setRadiusActiveId(null);
      setCouponUsageActiveIdState(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="MusicPickDetailBottom">
      <MusicComment />
      <div className="bottom">
        <MusicPickBtn
          text="바로 듣기"
          className="listen"
          onClick={() => listenSong(title, artist)}
        />
        <MusicPickBtn
          text="줍기"
          className={`pick ${pickupStatus && "disable"}`}
          onClick={pickMusic}
          disabled={pickupStatus}
        />
      </div>
    </div>
  );
};

export default memo(MusicPickDetailBottom);
