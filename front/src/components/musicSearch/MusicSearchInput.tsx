import { MdOutlineClear } from "react-icons/md";
import "@/styles/musicSearch/MusicSearchInput.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SearchedWordsList } from "../../types/songType";
import { inputSearchKeyWord, searchedWords } from "@store/musicSearch/atoms";
import { useNavigate } from "react-router-dom";
import ToasterMsg from "@components/ToasterMsg";
import { toastMsg } from "@/utils/toastMsg";

const MusicSearchInput = () => {
  const navigate = useNavigate();
  const setWords = useSetRecoilState<SearchedWordsList[]>(searchedWords);
  const [title, setTitle] = useRecoilState(inputSearchKeyWord);

  const onSearch = async (searchKeyWord: string) => {
    const trimmedKeyword = searchKeyWord.trim();
    const encodedSearchKeyword = encodeURIComponent(trimmedKeyword);

    if (encodedSearchKeyword !== "") {
      navigate(`/music/search/results?query=${encodedSearchKeyword}`, {
        replace: true,
      });
    } else {
      navigate("/music/search", { replace: true });
    }
  };

  const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value === "") {
      onSearch("");
    }
  };

  const titleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title !== "") {
      onSearch(title);
      if (title.trim() !== "") {
        setWords((prevWords) => {
          const newId = prevWords.length ? prevWords[0].id + 1 : 0;
          const updatedWords = prevWords.filter((word) => word.title !== title);
          return [{ id: newId, title: title }, ...updatedWords];
        });
      } else {
        toastMsg("검색어를 입력하세요");
        setTitle("");
      }
    }
  };

  const clearTitle = () => {
    setTitle("");
    onSearch("");
  };

  return (
    <div className="MusicSearchInput">
      <form onSubmit={titleOnSubmit}>
        <div className="input-div">
          <input
            className="input"
            type="text"
            placeholder="쓰롱 할 음악을 검색하세요"
            value={title}
            onChange={titleOnChange}
            maxLength={30}
          />
          {title && (
            <MdOutlineClear className="clear-button" onClick={clearTitle} />
          )}
        </div>
      </form>
      <ToasterMsg />
    </div>
  );
};

export default MusicSearchInput;
