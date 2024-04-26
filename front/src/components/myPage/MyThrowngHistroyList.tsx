import { useEffect, useState, useCallback } from "react";
import { SongHistory } from "../../types/songType.ts";
import "@styles/myPage/MyThrowngHistroyList.scss";
import { TiLocation } from "react-icons/ti";
import { getMyDropHistory, getMyPickHistory } from "@services/myPageHistoryApi/MyPageHistoryApi.tsx";

interface Props {
  pageIdx: boolean;
  setHistoryCnt: React.Dispatch<React.SetStateAction<number>>;
}

const MyThrowngHistroyList = ({ pageIdx, setHistoryCnt }: Props) => {
  const [songHistoryList, setSongHistoryList] = useState<SongHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = pageIdx
      ? await getMyPickHistory()
      : await getMyDropHistory();

    if (res && res.data) {
      setSongHistoryList((prevList) => [...prevList, ...res.data]);
      setHistoryCnt((prevCnt) => prevCnt + res.data.length);
    }
    setIsLoading(false);
  }, [pageIdx, isLoading]);

  useEffect(() => {
    // fetchHistory();
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchHistory]);

  const handleGoNavigation = (song: SongHistory) => {
    console.log(song);
  };

  return (
    <div className="MyThrowngHistroyList">
      <div className="list-body">
        {songHistoryList.length > 0 ? (
          songHistoryList.map((song, index) => (
            <div key={index} className="result-item" onClick={() => handleGoNavigation(song)}>
              <div className="item-header">
                <div className="item-date">{song.date}</div>
                <div className="item-location">
                  <TiLocation /> {song.location}
                </div>
              </div>
              <div className="item">
                <div className="img-container">
                  <img src={song.albumImage} />
                </div>
                <div className="item-detail">
                  <div className="item-title">{song.title}</div>
                  <div className="item-artist">{song.artist}</div>
                  <div className="item-comment">{song.comment}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-result">내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MyThrowngHistroyList;
