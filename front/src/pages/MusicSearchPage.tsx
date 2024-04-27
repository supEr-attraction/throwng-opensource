// MusicSearchPage 컴포넌트 내부
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { inputSearchKeyWord, searchResultsState } from "@store/musicSearch/atoms.ts";
import Header from "@components/Header";
import MusicSearchInput from "@components/musicSearch/MusicSearchInput";
import MusicList from './../components/musicSearch/MusicList';
import "@/styles/musicSearch/MusicSearchPage.scss";
import "@services/musicSearchApi/MusicSearchApi.tsx";
import { detailModal } from "@store/playList/atoms.ts";
import { getSearchMusic } from "@services/musicSearchApi/MusicSearchApi.tsx";

const MusicSearchPage = () => {
  const setSearchResults = useSetRecoilState(searchResultsState);
  const [title, setTitle] = useRecoilState(inputSearchKeyWord);
  const resetDetailModal = useResetRecoilState(detailModal);

  useEffect(() => {
    if (title !== '') {
      onSearch(title);
      resetDetailModal();
    }
  }, [resetDetailModal]);

  const onSearch = async (searchKeyWord: string) => {
    if (searchKeyWord !== '') {
      setTitle(searchKeyWord);
      const res = await getSearchMusic(searchKeyWord);
      if (res && res.data) {
        setSearchResults(res.data);
      }
    } else {
      setSearchResults([]);
    }
  };

  const onWordClick = (searchKeyWord: string) => {
    setTitle(searchKeyWord);
    onSearch(searchKeyWord);
  };

  return (
    <div className="MusicSearchPage">
      <div className="container">
        <Header/>
        <MusicSearchInput onSearch={onSearch} title={title} setTitle={setTitle} />
      </div>
      <MusicList onWordClick={onWordClick}/>
    </div>
  );
};

export default MusicSearchPage;
