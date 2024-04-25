import { useState } from "react";
import "@styles/myPage/MyThrowngHistoryMenu.scss"
import MyThrowngHistroyList from "./MyThrowngHistroyList";

const MyThrowngHistoryMenu = () => {
  const [pageIdx, setPageIdx] = useState(false)
  const [histoyCnt, setHistoryCnt] = useState(0)

  return (
    <div className="MyThrowngHistoryMenu">
      <div className="menu-header">
        <div className="header-btn-div">
          <div className={`btn-item ${!pageIdx ? "" : "active"}`} onClick={() => setPageIdx(false)}>두기</div>
          <div className={`btn-item ${pageIdx ? "" : "active"}`} onClick={() => setPageIdx(true)}>줍기</div>
        </div>
        <div className="song-cnt">전체 {histoyCnt}개</div>
      </div>
      <MyThrowngHistroyList pageIdx={pageIdx} setHistoryCnt={setHistoryCnt}/>
    </div>
  )
}

export default MyThrowngHistoryMenu