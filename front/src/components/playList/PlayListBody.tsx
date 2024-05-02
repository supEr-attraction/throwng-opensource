import { memo, useCallback, useEffect, useRef, useState } from "react";
import "@styles/playList/PlayListBody.scss";
import { Content } from "../../types/songType";
import { IoMdMore } from "react-icons/io";
import PlayListItemModal from "./PlayListItemModal";
import PlayListDirectListenModal from "./PlayListDirectListenModal";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { detailModal, myPlayList, scrollSongIndex, speedListenModal } from "@store/playList/atoms";
import { getMyPlayList } from "@services/myPlayListApi/MyPlayListApi";
import Loading from "@components/Loading";

const PlayListBody = () => {
  const [playList, setPlayList] = useRecoilState<Content[]>(myPlayList);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [modalSongIndex, setModalSongIndex] = useRecoilState<number | null>(
    detailModal
  );
  const [speedModal, setSpeedModal] = useRecoilState<number | null>(
    speedListenModal
  );
  const resetPlayModal = useResetRecoilState(speedListenModal);
  const resetDetailModal = useResetRecoilState(detailModal);
  const resetPlayList = useResetRecoilState(myPlayList)
  const scrollIndex = useRecoilValue(scrollSongIndex)
  const resetScrollSongIndex = useResetRecoilState(scrollSongIndex)
  const observer = useRef<IntersectionObserver | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (lastModifiedAt: string = "") => {
    const data = await getMyPlayList(lastModifiedAt);
    if (data.last) {
      setIsLastPage(true);
    }
    setPlayList((prev) => [...prev, ...data.content]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!scrollIndex) {
      resetPlayList()
      fetchData();
    } else {
      moveScroll()
    }
    resetPlayModal();
    resetDetailModal();
  }, []);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLastPage) {
        fetchData(playList.length ? playList[playList.length - 1].modifiedAt : "");
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, isLastPage, fetchData, playList]);

  const moveScroll = () => {
    if (scrollIndex) {
      const element = document.getElementById(scrollIndex);
      if (element) {
          element.scrollIntoView({ block: 'center' });
          setIsLoading(false);
          resetScrollSongIndex()
      }
    }
  }

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
    setPlayList((prevPlayList) =>
      prevPlayList.filter((song) => song.playlistId !== playlistId)
    );
  };

  return (
    <div className="PlayListBody">
      {isLoading ? (
        <Loading />
      ) : playList.length > 0 ? (
        <div>
          {playList.map((song, index) => (
            <div key={`${song.playlistId}-${index}`} id={song.youtubeId} className="result-item">
              <div className="content-container">
                <div
                  className="image-container"
                  onClick={() => speedListenModalHandler(index)}
                >
                  <img src={song.albumImage} loading="lazy"/>
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
              {modalSongIndex === index && (
                <PlayListItemModal
                  song={song}
                  deleteSongFromPlayList={deleteSongFromPlayList}
                />
              )}
              {speedModal === index && (
                <PlayListDirectListenModal song={song} />
              )}
              {index === playList.length - 1 ? (
                <div ref={lastElementRef} />
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div>플레이리스트가 비어있습니다.</div>
      )}
    </div>
  );
};

export default memo(PlayListBody); 
