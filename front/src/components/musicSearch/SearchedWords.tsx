import { useState, useEffect } from "react"
import { MdOutlineClear } from "react-icons/md";
import NoSearchWords from "./NoSearchWords";
import "@styles/musicSearch/SearchedWords.scss"

interface SearchedWordsList {
  id: number,
  title: string
}

interface Props {
  onWordClick: (title: string) => void,
}

const SearchedWords = ({onWordClick}:Props) => {
  const [searchedWords, setSearchedWords] = useState<SearchedWordsList[]>([])

  // useEffect(() => {
  //   // api 호출
  // },[searchedWords])

  useEffect(() => {
    const dummyList: SearchedWordsList[] = [
      { id: 1, title: "에스파" },
      { id: 2, title: "아이브" },
      { id: 3, title: "아이즈원" },
      { id: 4, title: "아일릿" },
    ];
    setSearchedWords(dummyList);
  }, [])

  const deleteWord = (id: number) => {
    setSearchedWords((words) => words.filter((word) => word.id !== id));
    // api 호출
  };

  const deleteAll = () => {
    setSearchedWords([]);
    // api 호출
  };

  if (searchedWords.length === 0) {
    return (
      <NoSearchWords/>
    )
  }

  return (
    <div className="SearchedWords">
      <div className="container">
        <div className="title">최근 검색어</div>
        <div className="all-delete" onClick={deleteAll}>전체 삭제</div>
      </div>
      <div className="word-list">
        {searchedWords.map((word) => (
          <div key={word.id} className="word-item">
            <div onClick={() => onWordClick(word.title)}>{word.title}</div>
            <MdOutlineClear className="word-delete" onClick={() => deleteWord(word.id)}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchedWords