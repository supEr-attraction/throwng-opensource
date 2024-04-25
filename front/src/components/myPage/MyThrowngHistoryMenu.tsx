import { useState } from "react";
import "@styles/myPage/MyThrowngHistoryMenu.scss";
import MyThrowngHistroyList from "./MyThrowngHistroyList";

const MyThrowngHistoryMenu = () => {
  const [pageIdx, setPageIdx] = useState(false);
  const [histoyCnt, setHistoryCnt] = useState(0);
  const [period, setPeriod] = useState('default');

  return (
    <div className="MyThrowngHistoryMenu">
      <div className="menu-header">
        <div className="header-btn-div">
          <div className={`btn-item ${!pageIdx ? "" : "active"}`} onClick={() => setPageIdx(false)}>두기</div>
          <div className={`btn-item ${pageIdx ? "" : "active"}`} onClick={() => setPageIdx(true)}>줍기</div>
        </div>
        <div className="period-select">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="default">오늘</option>
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
            <option value="all">전체</option>
          </select>
        </div>
        <div className="song-cnt">전체 {histoyCnt}개</div>
      </div>
      <MyThrowngHistroyList pageIdx={pageIdx} setHistoryCnt={setHistoryCnt}/>
    </div>
  );
};

export default MyThrowngHistoryMenu;
