import "@styles/playList/PlayListDirectListenModal.scss";
import { Content } from "../../types/songType";
import youtubeMusic from "@assets/images/youtubeMusic.webp";
import { useSetRecoilState } from "recoil";
import { speedListenModal } from "@store/playList/atoms";
import listenSong from "@/utils/listenSong";

interface Props {
  song: Content;
}

const PlayListDirectListenModal = ({ song }: Props) => {
  const setSpeedModal = useSetRecoilState(speedListenModal);


  return (
    <div className="PlayListDirectListenModal">
      <div onClick={() => setSpeedModal(null)}></div>
      <div
        onClick={() => listenSong(song.title, song.artist)}
        className="modal-body"
      >
        <div className="img-container">
          <img src={youtubeMusic} alt="" />
        </div>
        <div>바로 듣기</div>
      </div>
    </div>
  );
};

export default PlayListDirectListenModal;
