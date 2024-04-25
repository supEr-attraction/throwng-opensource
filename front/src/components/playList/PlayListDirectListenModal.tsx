import "@styles/playList/PlayListDirectListenModal.scss"
import { SongInfo } from "../../types/songType"
import youtubeMusic from "@assets/images/youtubeMusic.webp"
import { useSetRecoilState } from "recoil"
import { speedListenModal } from "@store/playList/atoms"

interface Props {
  song:SongInfo
}

const PlayListDirectListenModal = ({song}:Props) => {
  const setSpeedModal = useSetRecoilState(speedListenModal);
  
  const listenSong = (song:SongInfo) => {
    console.log(song)
    // 유튜브 뮤직 url 스킴
  }

  return (
    <div className="PlayListDirectListenModal">
      <div onClick={() => setSpeedModal(null)}></div>
      <div onClick={() => listenSong(song)} className="modal-body">
        <div className="img-container">
          <img src={youtubeMusic} alt="" />
        </div>
        <div>바로 듣기</div>
      </div>
    </div>
  )
}

export default PlayListDirectListenModal