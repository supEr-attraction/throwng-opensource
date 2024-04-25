import "@styles/playList/PlayListBody.scss"
import { useEffect, useState } from "react"
import { SongInfo } from "../../types/songType"
import { IoMdMore } from "react-icons/io";


import 피카1 from "@assets/images/피카1.png"

import PlayListItemModal from "./PlayListItemModal";
import PlayListDirectListenModal from "./PlayListDirectListenModal";
import { useRecoilState } from "recoil";
import { detailModal } from "@store/playList/atoms";
import { speedListenModal } from "@store/playList/atoms";

const PlayListBody = () => {
  const [playList, setPlayList] = useState<SongInfo[]>([]);
  const [modalSongIndex, setModalSongIndex] = useRecoilState(detailModal);
  const [speedModal, setSpeedModal] = useRecoilState(speedListenModal);

  // const [page, setPage] = useState(0);
  // const [hasMore, setHasMore] = useState(true);

  // useEffect(() => {
  //   const loadSongs = async () => {
  //     const data = [
  //       { youtubeId: 'qwer', albumImage: 피카1, artist: "aespa", title: "Spicy",},
  //       { youtubeId: 'qwer', albumImage: 피카2, artist: "아일릿", title: "노래2",},
  //       { youtubeId: 'qwer', albumImage: 피카3, artist: "잔나비", title: "노래3",},
  //       { youtubeId: 'qwer', albumImage: 피카2, artist: "허승경", title: "타이거즈 소크라테스", },
  //     ]
  //     setPlayList(data)
  //     setPlayList((prevSongs) => [...prevSongs, ...data]);
  //     setHasMore(data.length > 0);
  //   };

  //   if (hasMore) {
  //     loadSongs();
  //   }

  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop !==
  //         document.documentElement.offsetHeight ||
  //       !hasMore
  //     ) {
  //       return;
  //     }
  //     setPage((prevPage) => prevPage + 1);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [page, hasMore]);

  useEffect(() => {
    const data = [
      { youtubeId: 'qwer', albumImage: 피카1, artist: "문신웅", title: "젠킨슨은 어려워젠킨슨은 어려워젠킨슨은 어려워",},
      { youtubeId: 'asdf', albumImage: 피카1, artist: "김민준", title: "후.. 은퇴 마렵네",},
      { youtubeId: 'zxcv', albumImage: 피카1, artist: "정태윤", title: "내일 결혼식",},
    ]
    setPlayList(data)
  }, [])

  const modalStateHandler = (index: number) => {
    if (modalSongIndex === index) {
      setModalSongIndex(null);
      setSpeedModal(null);
    } else {
      setModalSongIndex(index);
    }
  }

  const speedListenModalHandler = (index: number) => {
    if (speedModal === index) {
      setSpeedModal(null);
      setModalSongIndex(null);
    } else {
      setSpeedModal(index)
    }
  }

  return (
    <div className="PlayListBody">
      {playList.length > 0 ? (
        <div className="playlist-list">
          {playList.map((song, index) => (
            <div key={index} className="result-item">
              <div className="items">
                <div className="image-container" onClick={() => speedListenModalHandler(index)}>
                  <img src={song.albumImage}/>
                </div>
                <div className="item-wide">
                  <div className="item-detail" onClick={() => speedListenModalHandler(index)}>
                    <div className="item-title">{song.title}</div>
                    <div className="item-artist">{song.artist}</div>
                  </div>
                  <div className="item-detail-btn" onClick={() => modalStateHandler(index)}><IoMdMore /></div>
                </div>
              </div>
              {modalSongIndex === index && <PlayListItemModal song={song}/>}
              {speedModal === index && <PlayListDirectListenModal song={song}/> }
            </div>
          ))}
        </div>
      ) : (
        <div>플레이리스트가 비어있습니다.</div>
      )}
    </div>
  )
}

export default PlayListBody