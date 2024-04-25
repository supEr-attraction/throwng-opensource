import Header from "@components/Header";
import MusicSearchInput from "@components/musicSearch/MusicSearchInput"
import MusicList from './../components/musicSearch/MusicList';
import { useEffect, useState } from "react";
import {Song} from "../types/songType.ts" 
import { useRecoilState } from "recoil";
import { inputSearchKeyWord, searchedWords } from "@store/musicSearch/atoms.ts";
import { SearchedWordsList } from "../types/songType.ts"
import "@/styles/musicSearch/MusicSearchPage.scss"

import 피카1 from "@assets/images/피카1.png"
import 피카2 from "@assets/images/피카2.png"
import 피카3 from "@assets/images/피카3.png"

const MusicSearchPage = () => {
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [title, setTitle] = useRecoilState(inputSearchKeyWord);
  const [words, setWords] = useRecoilState<SearchedWordsList[]>(searchedWords)

  useEffect(() => {
    if (title !== '') {
      onSearch(title)
    }
  }, [])

  const onSearch = (searchKeyWord: string) => {
    setTitle(searchKeyWord);
    if (searchKeyWord !== ''){
      setWords((prevWords) => {
        const lastId = prevWords.length ? prevWords[prevWords.length - 1].id : 0;
        return [...prevWords, { id: lastId + 1, title: searchKeyWord }];
      });
    }
    // api 호출하여 setSearchResults에 값 넣기
    const results = searchKeyWord ? [
      { id: 1, image: 피카1, artist: "aespa", title: "Spicy", playtime: "3:45" },
      { id: 2, image: 피카2, artist: "아일릿", title: "노래2", playtime: "4:05" },
      { id: 3, image: 피카3, artist: "잔나비", title: "노래3", playtime: "2:30" },
      { id: 4, image: 피카3, artist: "빈지노", title: "노래3", playtime: "2:30" },
      { id: 5, image: 피카1, artist: "문신웅", title: "젠킨슨은 어려워젠킨슨은 어려워젠킨슨은 어려워젠킨슨은 어려워", playtime: "2:30" },
      { id: 6, image: 피카2, artist: "강민정", title: "김도영 힘차게 달려라", playtime: "2:30" },
      { id: 7, image: 피카3, artist: "정태윤", title: "타이거즈 나성범 홈런", playtime: "2:30" },
      { id: 8, image: 피카1, artist: "임승연", title: "작은거인 기아 김선빈", playtime: "2:30" },
      { id: 9, image: 피카2, artist: "허승경", title: "타이거즈 소크라테스", playtime: "2:30" },
    ] : []
    setSearchResults(results);
  };

  const onWordClick = (searchKeyWord: string) => {
    setTitle(searchKeyWord);
    onSearch(searchKeyWord);
    console.log(words)
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

export default MusicSearchPage;
