import { useEffect, useState } from "react";
import "@styles/playList/PlayListBody.scss";
import { Content } from "../../types/songType";
import { IoMdMore } from "react-icons/io";
import PlayListItemModal from "./PlayListItemModal";
import PlayListDirectListenModal from "./PlayListDirectListenModal";
import { useRecoilState, useResetRecoilState } from "recoil";
import { detailModal, speedListenModal } from "@store/playList/atoms";
import { getMyPlayList } from "@services/myPlayListApi/MyPlayListApi";

const PlayListBody = () => {
  const [playList, setPlayList] = useState<Content[]>([]);
  const [lastModifiedAt, setLastModifiedAt] = useState('');
  const [isLastPage, setIsLastPage] = useState(false);
  const [modalSongIndex, setModalSongIndex] = useRecoilState(detailModal);
  const [speedModal, setSpeedModal] = useRecoilState(speedListenModal);
  const resetPlayModal = useResetRecoilState(speedListenModal);
  const resetDetailModal = useResetRecoilState(detailModal);

  const fetchData = async () => {
    const data = await getMyPlayList(lastModifiedAt);
    if (data.content.length > 0) {
      setLastModifiedAt(data.content[data.content.length - 1].modifiedAt);
      setPlayList(prev => [...prev, ...data.content]);
    }
    setIsLastPage(data.last);
  }

  useEffect(() => {
    fetchData();
    resetPlayModal();
    resetDetailModal();

    const onScroll = async () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLastPage) return;
      await fetchData();
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastModifiedAt, isLastPage]);

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
        <div>
          {playList.map((song, index) => (
            <div key={index} className="result-item">
              <div className="content-container">
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
          {isLastPage && <div>마지막 플레이리스트입니다.</div>}
        </div>
      ) : (
        <div>플레이리스트가 비어있습니다.</div>
      )}
    </div>
  )  
}

export default PlayListBody
