import { useCallback, useEffect, useRef, useState } from "react";
import "@styles/playList/PlayListBody.scss";
import { Content } from "../../types/songType";
import { IoMdMore } from "react-icons/io";
import PlayListItemModal from "./PlayListItemModal";
import PlayListDirectListenModal from "./PlayListDirectListenModal";
import { useRecoilState, useResetRecoilState } from "recoil";
import { detailModal, speedListenModal } from "@store/playList/atoms";
import { getMyPlayList } from "@services/myPlayListApi/MyPlayListApi";
import Loading from "@components/Loading";

const PlayListBody = () => {
  const [playList, setPlayList] = useState<Content[]>([]);
  const [, setLastModifiedAt] = useState<string>("");
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [modalSongIndex, setModalSongIndex] = useRecoilState<number | null>(detailModal);
  const [speedModal, setSpeedModal] = useRecoilState<number | null>(speedListenModal);
  const resetPlayModal = useResetRecoilState(speedListenModal);
  const resetDetailModal = useResetRecoilState(detailModal);
  const observer = useRef<IntersectionObserver | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const lastElementRef = useCallback((node: Element | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isLastPage) {
        const lastItem = playList[playList.length - 1];
        fetchData(lastItem.modifiedAt);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLastPage, playList]);

  useEffect(() => {
    fetchData();
    resetPlayModal();
    resetDetailModal();
  }, []);
  
  const fetchData = async (lastModifiedAt: string = "") => {
    setIsLoading(true);
    const data = await getMyPlayList(lastModifiedAt);
    if (data.last) {
      setIsLastPage(true);
    }
    setPlayList(prev => [...prev, ...data.content]);
    setLastModifiedAt(data.content[data.content.length - 1].modifiedAt);
    setIsLoading(false);
  };

  const modalStateHandler = (index: number) => {
    if (modalSongIndex === index) {
      setModalSongIndex(null);
      setSpeedModal(null);
    } else {
      setModalSongIndex(index);
    }
  };

  const speedListenModalHandler = (index: number) => {
    if (speedModal === index) {
      setSpeedModal(null);
      setModalSongIndex(null);
    } else {
      setSpeedModal(index);
    }
  };

  const deleteSongFromPlayList = (playlistId: number) => {
    setPlayList(prevPlayList => prevPlayList.filter(song => song.playlistId !== playlistId));
  };

  return (
    <div className="PlayListBody">
      {isLoading ? <Loading /> : 
        playList.length > 0 ? (
          <div>
            {playList.map((song, index) => (
              <div key={index} className="result-item">
                <div className="content-container">
                  <div
                    className="image-container"
                    onClick={() => speedListenModalHandler(index)}
                  >
                    <img src={song.albumImage} />
                  </div>
                  <div className="item-wide">
                    <div
                      className="item-detail"
                      onClick={() => speedListenModalHandler(index)}
                    >
                      <div className="item-title">{song.title}</div>
                      <div className="item-artist">{song.artist}</div>
                    </div>
                    <div
                      className="item-detail-btn"
                      onClick={() => modalStateHandler(index)}
                    >
                      <IoMdMore />
                    </div>
                  </div>
                </div>
                {modalSongIndex === index && <PlayListItemModal song={song} deleteSongFromPlayList={deleteSongFromPlayList} />}
                {speedModal === index && (
                  <PlayListDirectListenModal song={song} />
                )}
                {index === playList.length - 1 ? <div ref={lastElementRef} /> : null}
              </div>
            ))}
          </div>
        ) : (
          <div>플레이리스트가 비어있습니다.</div>
        )
      }
    </div>
  );
};

export default PlayListBody;
