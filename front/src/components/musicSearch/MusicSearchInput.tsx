import { useRef } from "react"
import { MdOutlineClear } from "react-icons/md";
import "@/styles/musicSearch/MusicSearchInput.scss"
import { useRecoilState, useSetRecoilState } from "recoil";
import { SearchedWordsList } from "../../types/songType";
import { inputSearchKeyWord, searchedWords } from "@store/musicSearch/atoms";
import { useNavigate } from "react-router-dom";

const MusicSearchInput = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setWords = useSetRecoilState<SearchedWordsList[]>(searchedWords)
  const [title, setTitle] = useRecoilState(inputSearchKeyWord);

  const onSearch = async (searchKeyWord: string) => {
    if (searchKeyWord !== '') {
      navigate(`/music/search/${searchKeyWord}`)
    } else {
      navigate('/music/search', { replace: true });
    }
  };

  const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      onSearch('');
    }
  };

  const titleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(title);
    if (title !== ''){
      setWords((prevWords) => {
        const newId = prevWords.length ? prevWords[prevWords.length - 1].id + 1 : 1;
        const updatedWords = prevWords.filter((word) => word.title !== title);
        return [{ id: newId, title: title }, ...updatedWords];
      });
    }
  };
  
  const clearTitle = () => {
    setTitle('');
    onSearch('');
  };

  return (
    <div className="MusicSearchInput">
      <form onSubmit={titleOnSubmit}>
        <div className="input-div">
          <input 
            className="input"
            ref={inputEl} 
            type="text" 
            placeholder="검색어를 입력하세요." 
            value={title} 
            onChange={titleOnChange} 
            maxLength={30} 
          />
          {title && <MdOutlineClear className="clear-button" onClick={clearTitle} />}
        </div>
      </form>
    </div>
  );
};


export default MusicSearchInput