import "@styles/playList/PlayListItemModal.scss"
import { SongInfo } from "../../types/songType"
import { IoSearch } from "react-icons/io5";
import { GiMicrophone } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { detailModal, speedListenModal } from "@store/playList/atoms";
import { useEffect } from "react";
import { inputSearchKeyWord } from "@store/musicSearch/atoms";
import { useNavigate } from "react-router-dom";

interface Props {
  song:SongInfo
}

const PlayListItemModal = ({song}:Props) => {
  const setModalSongIndex = useSetRecoilState(detailModal);
  const setSpeedModal = useSetRecoilState(speedListenModal);
  const setInputSearchKeyWord = useSetRecoilState(inputSearchKeyWord);
  const navigate = useNavigate();

  useEffect(() => {
    setSpeedModal(null)
  })

  const deleteSong = (e:React.MouseEvent<HTMLLIElement>) => {
    // 지우는 api 호출 params = {song.youtubeId}
    e.preventDefault();
    console.log(song.youtubeId)
    setModalSongIndex(null)
  }
  
  const searchSong = (song:SongInfo) => {
    console.log(song)
    setInputSearchKeyWord(song.title);
    navigate('/music/search')
  }

  const searchSinger = (song:SongInfo) => {
    console.log(song)
    setInputSearchKeyWord(song.artist);
    navigate('/music/search')
  }

  return (
    <div className="PlayListItemModal">
      <div className="background" onClick={() => setModalSongIndex(null)} />
      <div className="item-modal-body">
        <div className="item">
          <div className="image-container">
            <img src={song.albumImage}/>
          </div>

          <div className="item-wide">
            <div className="item-detail">
              <div className="item-title">{song.title}</div>
              <div className="item-artist">{song.artist}</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="modal-menu">
          <li onClick={() => searchSong(song)}><GiMicrophone /><div>관련 노래 검색</div></li>
          <li onClick={() => searchSinger(song)}><IoSearch /><div>아티스트 검색</div></li>
          <li onClick={deleteSong}><AiOutlineDelete /><div>삭제</div></li>
        </div>
      </div>
    </div>
  )
}

export default PlayListItemModal