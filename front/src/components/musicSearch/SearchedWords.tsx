import { MdOutlineClear } from "react-icons/md";
import NoSearchWords from "./NoSearchWords";
import "@styles/musicSearch/SearchedWords.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { inputSearchKeyWord, searchedWords } from "@store/musicSearch/atoms";
import { SearchedWordsList } from "../../types/songType.ts";
import { useNavigate } from "react-router-dom";

const SearchedWords = () => {
  const navigate = useNavigate();
  const [words, setWords] = useRecoilState<SearchedWordsList[]>(searchedWords);
  const setTitle = useSetRecoilState(inputSearchKeyWord);

  const onWordClick = (searchKeyWord: string) => {
    setTitle(searchKeyWord);
    navigate(`/music/search/${searchKeyWord}`, { replace: true });
  };

  const deleteWord = (id: number) => {
    setWords((words) => words.filter((word) => word.id !== id));
  };

  const deleteAll = () => {
    setWords([]);
  };

  if (words.length === 0) {
    return <NoSearchWords />;
  }

  return (
    <div className="SearchedWords">
      <div className="container">
        <div className="title">최근 검색어</div>
        <div className="all-delete" onClick={deleteAll}>
          전체 삭제
        </div>
      </div>
      <div className="word-list">
        {words.map((word) => (
          <div key={word.id} className="word-item">
            <div onClick={() => onWordClick(word.title)} className="word-title">
              {word.title}
            </div>
            <MdOutlineClear
              className="word-delete"
              onClick={() => deleteWord(word.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchedWords;
