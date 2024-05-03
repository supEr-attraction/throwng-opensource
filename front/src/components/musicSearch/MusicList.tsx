import { useNavigate, useParams } from "react-router-dom";
import { Song } from "../../types/songType.ts";
import "@styles/musicSearch/MusicList.scss";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { inputSearchKeyWord } from "@store/musicSearch/atoms.ts";
import Header from "@components/Header.tsx";
import MusicSearchInput from "./MusicSearchInput.tsx";
import { useEffect, useState } from "react";
import { getSearchMusic } from "@services/musicSearchApi/MusicSearchApi.tsx";
import { selectMusic } from "@store/music/drop/atoms.ts";
import Loading from "@components/Loading.tsx";

const MusicList = () => {
  const navigate = useNavigate();
  const setTitle = useSetRecoilState(inputSearchKeyWord);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const setSelectMusic = useSetRecoilState(selectMusic);
  const resetSelectMusic = useResetRecoilState(selectMusic);
  const params = useParams();
  const searchKeyword = params.id;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    resetSelectMusic();
    if (searchKeyword) {
      onSearch(searchKeyword);
    }
  }, [searchKeyword]);

  const onSearch = async (searchKeyWord: string) => {
    setIsLoading(true);
    setTitle(searchKeyWord);
    const res = await getSearchMusic(searchKeyWord);
    if (res) {
      setSearchResults(res);
    }
    setIsLoading(false);
  };

  const handleGoNavigation = (song: Song) => {
    setSelectMusic(song);
    navigate(`/music/drop/${song.youtubeId}`);
  };

  return (
    <div className="MusicList">
      <div className="MusicList-header">
        <Header />
        <MusicSearchInput />
      </div>
      {isLoading ? (
        <Loading />
      ) : searchResults && searchResults.length > 0 ? (
        <div className="searchResults none-scroll">
          {searchResults.map((song, index: number) => (
            <div
              key={index}
              className="result-item"
              onClick={() => handleGoNavigation(song)}
            >
              <div className="image-container">
                <img src={song.albumImage} loading="lazy" />
              </div>

              <div className="item-wide">
                <div className="item-detail">
                  <div className="item-title">{song.title}</div>
                  <div className="item-artist">{song.artist}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="SearchedWords">
          <div className="no-word-container">
            <div className="title">앗!</div>
            <div className="subtitle">검색결과가 없어요.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicList;
