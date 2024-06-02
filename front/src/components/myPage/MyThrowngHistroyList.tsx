// import { useCallback, useEffect, useRef, useState } from "react";
import { useEffect, useState } from "react";
import { MyHistory } from "../../types/songType";
import "@styles/myPage/MyThrowngHistroyList.scss";
import { TiLocation } from "react-icons/ti";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  myPickHistoryList,
  myThrowHistoryList,
  scrollHistoryIndex,
  throwngFilter,
} from "@store/myPage/atoms";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import SongItemModule from "@components/SongItemModule";

interface Props {
  pageIdx: boolean;
  setHistoryCnt: React.Dispatch<React.SetStateAction<number>>;
}

const MyThrowngHistroyList = ({ pageIdx, setHistoryCnt }: Props) => {
  const [songHistoryList, setSongHistoryList] = useState<Array<MyHistory>>([]);
  const filter = useRecoilValue(throwngFilter);
  const filterThrownList = useRecoilValue(myThrowHistoryList);
  const filterPickList = useRecoilValue(myPickHistoryList);
  const now = dayjs();
  const sevenDaysAgo = dayjs().subtract(7, "days");
  const navigate = useNavigate();
  const setScrollHistoryIndex = useSetRecoilState(scrollHistoryIndex);
  const scrollIndex = useRecoilValue(scrollHistoryIndex);
  const resetScrollHistoryIndex = useResetRecoilState(scrollHistoryIndex);
  // const observer = useRef<IntersectionObserver | null>(null);

  dayjs.extend(isBetween);

  useEffect(() => {
    fetchAndFilterHistory();
    if (scrollIndex && songHistoryList.length > 0) {
      moveScroll();
    }
  }, [filter, pageIdx, scrollIndex, songHistoryList.length]);

  const handleGoNavigation = (song: MyHistory, index: number) => {
    setScrollHistoryIndex(`${index}`);
    if ("myThrowId" in song) {
      navigate(`/music/pick/${song.myThrowId}`);
    } else if ("myPickId" in song) {
      navigate(`/music/pick/${song.throwId}`);
    }
  };

  const fetchAndFilterHistory = () => {
    const dataList = !pageIdx ? filterThrownList : filterPickList;
    const filteredData = dataList
      .filter((item: MyHistory) => {
        const dateToUse = item.dropDate ? item.dropDate : item.pickDate;
        const itemDate = dayjs(dateToUse);
        switch (filter) {
          case "오늘":
            return now.isSame(itemDate, "day");
          case "이번 주":
            return dayjs(now).isBetween(sevenDaysAgo, now, "day", "[]");
          case "이번 달":
            return now.isSame(itemDate, "month");
          case "전체":
            return true;
          default:
            return false;
        }
      })
      .sort((a, b) => {
        const dateA = a.dropDate ? a.dropDate : a.pickDate;
        const dateB = b.dropDate ? b.dropDate : b.pickDate;
        return dayjs(dateB).diff(dayjs(dateA));
      });

    setSongHistoryList(filteredData);
    setHistoryCnt(filteredData.length);
  };

  const moveScroll = () => {
    const element = document.getElementById(scrollIndex);
    if (element) {
      element.scrollIntoView({ block: "center" });
      resetScrollHistoryIndex();
    }
  };

  // const lastElementRef = useCallback(
  //   (node: HTMLDivElement) => {
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && !isLastPage) {
  //         fetchData(
  //           songHistoryList.length ? songHistoryList[playList.length - 1].modifiedAt : ""
  //         );
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [isLastPage, fetchData, songHistoryList]
  // );

  // const lastElementRef = useCallback((node: HTMLDivElement) => {
  //   console.log(1);
  //   if (observer.current) observer.current.disconnect();
  //   if (node) observer.current.observe(node);
  // }, [])

  return (
    <div className="MyThrowngHistroyList">
      <div className="list-body">
        {songHistoryList.length > 0 ? (
          songHistoryList.map((song, index) => (
            <div
              className="result-item"
              key={index}
              onClick={() => handleGoNavigation(song, index)}
            >
              <div className="item-header">
                {!pageIdx ? (
                  <div className="item-date">
                    {dayjs(song.dropDate).format("YYYY-MM-DD")}
                  </div>
                ) : (
                  <div className="item-date">
                    {dayjs(song.pickDate).format("YYYY-MM-DD")}
                  </div>
                )}
                <div className="item-location">
                  <TiLocation />
                  <div>{song.location}</div>
                </div>
              </div>
              <SongItemModule song={song} index={index} type="history" />
              {/* {songHistoryList.length ? <div ref={lastElementRef} /> : null} */}
            </div>
          ))
        ) : (
          <div className="no-word-container">
            <div className="title">앗!</div>
            <div className="subtitle">기록이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyThrowngHistroyList;
