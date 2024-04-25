import { useRef, useEffect } from "react"
import { MdOutlineClear } from "react-icons/md";
import "@/styles/musicSearch/MusicSearchInput.scss"
import { useRecoilState } from "recoil";
import { inputSearchKeyWord } from "@store/musicSearch/atoms";

interface Props {
  onSearch: (songInfo: string) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const MusicSearchInput = ({ onSearch, title, setTitle }: Props) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [text, setText] = useRecoilState(inputSearchKeyWord)

  useEffect(() => {
    inputEl.current!.focus();
  }, []);

  const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      setText('');
      onSearch('');
    }
  };

  const titleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText(title);
    onSearch(title);
    inputEl.current!.blur()
  };

  const clearTitle = () => {
    setTitle('');
    inputEl.current!.focus();
    setText('');
    onSearch('');
  };

  return (
    <form className="MusicSearchInput" onSubmit={titleOnSubmit}>
      <div className="input-div">
        <input className="input" ref={inputEl} type="text" placeholder="검색어를 입력하세요." value={title} onChange={titleOnChange} maxLength={10} />
        {text && <MdOutlineClear className="clear-button" onClick={clearTitle} />}
      </div>
    </form>
  );
};


export default MusicSearchInput