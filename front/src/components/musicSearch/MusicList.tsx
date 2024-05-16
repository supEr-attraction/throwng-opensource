import { useNavigate } from "react-router-dom";
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
import SongItemModule from "@components/SongItemModule.tsx";

const MusicList = () => {
  const navigate = useNavigate();
  const setTitle = useSetRecoilState(inputSearchKeyWord);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const setSelectMusic = useSetRecoilState(selectMusic);
  const resetSelectMusic = useResetRecoilState(selectMusic);
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("query");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    resetSelectMusic();
    if (searchKeyword) {
      onSearch(decodeURIComponent(searchKeyword));
    }
  }, [searchKeyword])

  const onSearch = async (searchKeyWord: string) => {
    setIsLoading(true);
    const decodedKeyword = decodeURIComponent(searchKeyWord);
    setTitle(decodedKeyword);
    const res = await getSearchMusic(decodedKeyword);
    if (res) {
      setSearchResults(res);
    }
    setIsLoading(false)
  };

  const handleGoNavigation = (song : Song) => {
    setSelectMusic(song)
    navigate(`/music/drop/${song.youtubeId}`)
  }

  return (
    <div className="MusicList">
      <div className="MusicList-header">
        <Header/>
        <MusicSearchInput/>
      </div>
      {isLoading ? ( <Loading /> ) 
      : searchResults && searchResults.length > 0 ? (
        <div className="searchResults none-scroll">
          {searchResults.map((song, index: number) => (
            <SongItemModule
              key={index}
              type="search"
              onClick={() => handleGoNavigation(song)}
              song={song}            
            />
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
  )
}

export default MusicList
