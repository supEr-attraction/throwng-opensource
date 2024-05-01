import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { inputSearchKeyWord } from "@store/musicSearch/atoms.ts";
import Header from "@components/Header";
import MusicSearchInput from "@components/musicSearch/MusicSearchInput";
import "@/styles/musicSearch/MusicSearchPage.scss";
import "@services/musicSearchApi/MusicSearchApi.tsx";
import { detailModal } from "@store/playList/atoms.ts";
import SearchedWords from "@components/musicSearch/SearchedWords";

const MusicSearchPage = () => {
  const title = useRecoilValue(inputSearchKeyWord);
  const resetDetailModal = useResetRecoilState(detailModal);
  const resetTitle = useResetRecoilState(inputSearchKeyWord);

  useEffect(() => {
    if (title !== "") {
      resetDetailModal();
    }
    resetTitle();
  }, []);

  return (
    <div className="MusicSearchPage">
      <div>
        <div className="MusicSearchPage-header">
          <Header />
          <MusicSearchInput />
        </div>
        <div className="searched-word">
          <SearchedWords />
        </div>
      </div>
    </div>
  );
};

export default MusicSearchPage;
