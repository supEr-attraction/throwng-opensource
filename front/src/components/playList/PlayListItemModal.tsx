import "@styles/playList/PlayListItemModal.scss";
import { Content, SearchedWordsList, Song } from "../../types/songType";
import { IoSearch } from "react-icons/io5";
import { GiMicrophone } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { detailModal, speedListenModal } from "@store/playList/atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchedWords } from "@store/musicSearch/atoms";
import { deleteMyPlayList } from "@services/myPlayListApi/MyPlayListApi";
import { selectMusic } from "@store/music/drop/atoms";
import logo from "@assets/images/logo.png";

interface Props {
  song: Content;
  deleteSongFromPlayList: (playlistId: number) => void;
}

const PlayListItemModal = ({ song, deleteSongFromPlayList }: Props) => {
  const setModalSongIndex = useSetRecoilState(detailModal);
  const setSpeedModal = useResetRecoilState(speedListenModal);
  const setSelectMusic = useSetRecoilState(selectMusic);
  const setWords = useSetRecoilState<SearchedWordsList[]>(searchedWords);
  const navigate = useNavigate();

  useEffect(() => {
    setSpeedModal();
  }, []);

  const goSearch = (keyword: string) => {
    navigate(`/music/search/${keyword}`, { replace: true });
    setWords((prevWords) => {
      const newId = prevWords.length
        ? prevWords[prevWords.length - 1].id + 1
        : 1;
      const updatedWords = prevWords.filter((word) => word.title !== keyword);
      return [{ id: newId, title: keyword }, ...updatedWords];
    });
  };

  const deleteSong = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    await deleteMyPlayList(song.playlistId);
    deleteSongFromPlayList(song.playlistId);
    setModalSongIndex(null);
  };

  const directDrop = (song: Content) => {
    const songForSelectMusic: Song = {
      youtubeId: song.youtubeId,
      albumImage: song.albumImage,
      artist: song.artist,
      title: song.title,
      playTime: "",
    };
    setSelectMusic(songForSelectMusic);
    navigate(`/music/drop/${song.youtubeId}`);
  };

  const searchSong = (song: Content) => {
    goSearch(song.title);
  };

  const searchSinger = (song: Content) => {
    goSearch(song.artist);
  };

  return (
    <div className="PlayListItemModal">
      <div className="background" onClick={() => setModalSongIndex(null)} />
      <div className="item-modal-body">
        <div className="item">
          <div className="image-container">
            <img src={song.albumImage} />
          </div>
          <div className="item-detail">
            <div className="item-title">{song.title}</div>
            <div className="item-artist">{song.artist}</div>
          </div>
        </div>
        <hr />
        <div className="modal-menu">
          <li onClick={() => directDrop(song)}>
            <img src={logo} alt="" />
            <div>노래 쓰롱 하기</div>
          </li>
          <li onClick={() => searchSong(song)}>
            <GiMicrophone />
            <div>관련 노래 검색</div>
          </li>
          <li onClick={() => searchSinger(song)}>
            <IoSearch />
            <div>아티스트 검색</div>
          </li>
          <li onClick={deleteSong}>
            <AiOutlineDelete />
            <div>삭제</div>
          </li>
        </div>
      </div>
    </div>
  );
};

export default PlayListItemModal;
