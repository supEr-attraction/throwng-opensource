import { useRef, useEffect } from "react"
import { MdOutlineClear } from "react-icons/md";
import "@/styles/musicSearch/MusicSearchInput.scss"

interface Props {
  onSearch: (songInfo: string) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const MusicSearchInput = ({ onSearch, title, setTitle }: Props) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current!.focus();
  }, []);

  const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      if (localStorage.getItem('searchKeyWord')) {
        localStorage.removeItem('searchKeyWord')
      }
      onSearch('');
    }
  };

  const titleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localStorage.getItem('searchKeyWord')) {
      localStorage.removeItem('searchKeyWord')
    }
    localStorage.setItem('searchKeyWord', JSON.stringify(title));
    onSearch(title);
  };

  const clearTitle = () => {
    setTitle('');
    inputEl.current!.focus();
    if (localStorage.getItem('searchKeyWord')) {
      localStorage.removeItem('searchKeyWord')
    }
    onSearch('');
  };

  return (
    <form className="MusicSearchInput" onSubmit={titleOnSubmit}>
      <input className="input" ref={inputEl} type="text" placeholder="검색어를 입력하세요." value={title} onChange={titleOnChange} />
      {title && <MdOutlineClear className="clear-button" onClick={clearTitle} />}
    </form>
  );
};


export default MusicSearchInput