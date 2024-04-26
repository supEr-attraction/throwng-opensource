import Header from "@components/Header";
import MusicSearchInput from "@components/musicSearch/MusicSearchInput"
import MusicList from './../components/musicSearch/MusicList';
import { useEffect, useState } from "react";
import {SearchedWordsList, Song} from "../types/songType.ts" 
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { inputSearchKeyWord, searchedWords } from "@store/musicSearch/atoms.ts";
import "@/styles/musicSearch/MusicSearchPage.scss"
import "@services/musicSearchApi/MusicSearchApi.tsx"
import { detailModal } from "@store/playList/atoms.ts";
import { getSearchMusic } from "@services/musicSearchApi/MusicSearchApi.tsx";

const MusicSearchPage = () => {
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [title, setTitle] = useRecoilState(inputSearchKeyWord);
  const setWords = useSetRecoilState<SearchedWordsList[]>(searchedWords)
  const resetDetailModal = useResetRecoilState(detailModal);


  useEffect(() => {
    if (title !== '') {
      onSearch(title)
      resetDetailModal()
      setWords((prevWords) => {
        const lastId = prevWords.length ? prevWords[prevWords.length - 1].id : 0;
        return [...prevWords, { id: lastId + 1, title: title }];
      });
    }
  }, [])

  const onSearch = async (searchKeyWord: string) => {
    setTitle(searchKeyWord);

    // if (searchKeyWord !== '') {
    //   const res = await getSearchMusic(searchKeyWord);
    //   if (res && res.data) {
    //     setSearchResults(res.data)
    //   }
    // }
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
      <MusicList searchResults={searchResults} onWordClick={onWordClick}/>
    </div>
  );
};

export default MusicSearchPage