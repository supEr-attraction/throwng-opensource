import Header from "@components/Header";
import MusicSearchInput from "@components/musicSearch/MusicSearchInput"
import MusicList from './../components/musicSearch/MusicList';
import { useEffect, useState } from "react";
import {SearchedWordsList, Song} from "../types/songType.ts" 
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { inputSearchKeyWord, searchedWords } from "@store/musicSearch/atoms.ts";
import "@/styles/musicSearch/MusicSearchPage.scss"

import 피카1 from "@assets/images/피카1.png"
import 피카2 from "@assets/images/피카2.png"
import 피카3 from "@assets/images/피카3.png"
import { detailModal } from "@store/playList/atoms.ts";

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

  const onSearch = (searchKeyWord: string) => {
    setTitle(searchKeyWord);
    // api 호출하여 setSearchResults에 값 넣기
    // 무한스크롤 되게 하기~~
    const results = searchKeyWord ? [
      { youtubeId: 'qwer', albumImage: 피카1, artist: "aespa", title: "Spicy", playTime: "3:45" },
      { youtubeId: 'qwer', albumImage: 피카2, artist: "아일릿", title: "노래2", playTime: "4:05" },
      { youtubeId: 'qwer', albumImage: 피카3, artist: "잔나비", title: "노래3", playTime: "2:30" },
      { youtubeId: 'qwer', albumImage: 피카3, artist: "빈지노", title: "노래3", playTime: "2:30" },
      { youtubeId: 'qwer', albumImage: 피카1, artist: "문신웅", title: "젠킨슨은 어려워젠킨슨은 어려워젠킨슨은 어려워젠킨슨은 어려워", playTime: "2:30" },
      { youtubeId: 'qwer', albumImage: 피카2, artist: "강민정", title: "김도영 힘차게 달려라", playTime: "2:30" },
      { youtubeId: 'qwer', albumImage: 피카3, artist: "정태윤", title: "타이거즈 나성범 홈런", playTime: "2:30" },
      { youtubeId: 'qwer', albumImage: 피카1, artist: "임승연", title: "작은거인 기아 김선빈", playTime: "2:30" },
      { youtubeId: 'qwer', albumImage: 피카2, artist: "허승경", title: "타이거즈 소크라테스", playTime: "2:30" },
    ] : []
    setSearchResults(results);
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

export default MusicSearchPage;
