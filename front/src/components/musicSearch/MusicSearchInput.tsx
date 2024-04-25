import { useRef, useEffect } from "react"
import { MdOutlineClear } from "react-icons/md";
import "@/styles/musicSearch/MusicSearchInput.scss"
import { useSetRecoilState } from "recoil";
import { SearchedWordsList } from "../../types/songType";
import { searchedWords } from "@store/musicSearch/atoms";

interface Props {
  onSearch: (songInfo: string) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const MusicSearchInput = ({ onSearch, title, setTitle }: Props) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const setWords = useSetRecoilState<SearchedWordsList[]>(searchedWords)

  useEffect(() => {
    inputEl.current!.focus();
  }, []);

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
        const lastId = prevWords.length ? prevWords[prevWords.length - 1].id : 0;
        return [...prevWords, { id: lastId + 1, title: title }];
      });
    }
    inputEl.current!.blur()
  };

  const clearTitle = () => {
    setTitle('');
    inputEl.current!.focus();
    onSearch('');
  };

  return (

    <form className="MusicSearchInput" onSubmit={titleOnSubmit}>
      <div className="container">
        <div className="input-div">
          <input className="input" ref={inputEl} type="text" placeholder="검색어를 입력하세요." value={title} onChange={titleOnChange} maxLength={10} />
          {title && <MdOutlineClear className="clear-button" onClick={clearTitle} />}
        </div>
      </div>
    </form>
  );
};


export default MusicSearchInput