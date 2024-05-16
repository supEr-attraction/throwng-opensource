import { useCallback, useEffect, useRef, useState } from "react";
import "@styles/playList/PlayListBody.scss";
import { Content } from "../../types/songType";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  detailModal,
  myPlayList,
  scrollSongIndex,
  speedListenModal,
} from "@store/playList/atoms";
import { getMyPlayList } from "@services/myPlayListApi/MyPlayListApi";
import Loading from "@components/Loading";
import PlayListItem from "./PlayLIstItem";

const PlayListBody = () => {
  const [playList, setPlayList] = useRecoilState<Content[]>(myPlayList);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const resetPlayModal = useResetRecoilState(speedListenModal);
  const resetDetailModal = useResetRecoilState(detailModal);
  const resetPlayList = useResetRecoilState(myPlayList);
  const scrollIndex = useRecoilValue(scrollSongIndex);
  const resetScrollSongIndex = useResetRecoilState(scrollSongIndex);
  const observer = useRef<IntersectionObserver | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalSongIndex, setModalSongIndex] = useRecoilState<number | null>(
    detailModal
  );
  const [speedModal, setSpeedModal] = useRecoilState<number | null>(
    speedListenModal
  );

  useEffect(() => {
    setIsLoading(true);
    if (!scrollIndex) {
      resetPlayList();
      fetchData();
    } else {
      moveScroll();
    }
    resetPlayModal();
    resetDetailModal();
  }, []);

  const fetchData = useCallback(async (lastModifiedAt: string = "") => {
    const data = await getMyPlayList(lastModifiedAt);
    if (data.last) {
      setIsLastPage(true);
    }
    setPlayList((prev) => [...prev, ...data.content]);
    setIsLoading(false);
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLastPage) {
          fetchData(
            playList.length ? playList[playList.length - 1].modifiedAt : ""
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isLastPage, fetchData, playList]
  );

  const moveScroll = () => {
    if (scrollIndex) {
      const element = document.getElementById(scrollIndex);
      if (element) {
        element.scrollIntoView({ block: "center" });
        setIsLoading(false);
        resetScrollSongIndex();
      }
    }
  };

  const deleteSongFromPlayList = (playlistId: number) => {
    setPlayList((prevPlayList) =>
      prevPlayList.filter((song) => song.playlistId !== playlistId)
    );
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

  return (
    <div className="PlayListBody">
      {isLoading ? (
        <Loading />
      ) : playList.length > 0 ? (
        <div className="item-body">
          {playList.map((song, index) => (
          <PlayListItem
            key={song.playlistId}
            song={song}
            index={index}
            modalStateHandler={modalStateHandler}
            speedListenModalHandler={speedListenModalHandler}
            deleteSongFromPlayList={deleteSongFromPlayList}
          />
          ))}
          {playList.length ? <div ref={lastElementRef} /> : null}
        </div>
      ) : (
        <div className="SearchedWords">
          <div className="no-word-container">
            <div className="title">앗!</div>
            <div className="subtitle">플레이리스트가 비어있습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayListBody;
