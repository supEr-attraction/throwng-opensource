import { useEffect, useState } from "react";
import { MyPickHistory, MyThrowHistory } from "../../types/songType.ts";
import "@styles/myPage/MyThrowngHistroyList.scss";
import { TiLocation } from "react-icons/ti";
import { useRecoilValue } from "recoil";
import { myPickHistoryList, myThrowHistoryList, throwngFilter } from "@store/myPage/atoms.ts";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface Props {
  pageIdx:boolean
  setHistoryCnt: React.Dispatch<React.SetStateAction<number>>;
}

const MyThrowngHistroyList = ({ pageIdx, setHistoryCnt }: Props) => {
  const [songHistoryList, setSongHistoryList] = useState<Array<MyThrowHistory | MyPickHistory>>([]);
  const filter = useRecoilValue(throwngFilter);
  const filterThrownList = useRecoilValue(myThrowHistoryList);
  const filterPickList = useRecoilValue(myPickHistoryList);
  const now = moment();
  const sevenDaysAgo = moment().subtract(7, 'days');
  const navigate = useNavigate()

  const fetchAndFilterHistory = () => {
    const dataList = !pageIdx ? filterThrownList : filterPickList;
    const filteredData = dataList.filter((item: MyThrowHistory | MyPickHistory) => {
      const itemDate = moment(item.dropDate, "YYYY-MM-DDTHH:mm:ss");
      switch (filter) {
        case "오늘":
          return now.isSame(itemDate, 'day');
        case "이번 주":
          return itemDate.isBetween(sevenDaysAgo, now, 'days', '[]');
        case "이번 달":
          return now.isSame(itemDate, 'month');
        case "전체":
          return true;
        default:
          return false;
      }
    }).sort((a, b) => {
      return moment(b.dropDate, "YYYY-MM-DDTHH:mm:ss").diff(moment(a.dropDate, "YYYY-MM-DDTHH:mm:ss"));
    });
  
    setSongHistoryList(filteredData);
    setHistoryCnt(filteredData.length);
  };

  useEffect(() => {
    fetchAndFilterHistory();
  }, [filter, pageIdx, filterThrownList, filterPickList]);

  const handleGoNavigation = (song: MyThrowHistory | MyPickHistory) => {
    if ('myThrowId' in song) {
      navigate(`/music/pick/${song.myThrowId}`);
    }
    else if ('myPickId' in song) {
      navigate(`/music/pick/${song.myPickId}`);
    }
  };

  return (
    <div className="MyThrowngHistroyList">
      <div className="list-body">
        {songHistoryList.length > 0 ? (
          songHistoryList.map((song, index) => (
            <div key={index} className="result-item" onClick={() => handleGoNavigation(song)}>
              <div className="item-header">
              <div className="item-date">{moment(song.dropDate).format("YYYY-MM-DD")}</div>
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
