import { useEffect, useState } from "react";
import "@styles/myPage/MyThrowngHistoryMenu.scss";
import MyThrowngHistroyList from "./MyThrowngHistroyList";
import { LuListFilter } from "react-icons/lu";
import MyThrowngHistoryFilterModal from "./MyThrowngHistoryFilterModal";
import { useRecoilState, useResetRecoilState } from "recoil";
import { pageIdx, throwngFilterModal } from "@store/myPage/atoms";

const MyThrowngHistoryMenu = () => {
  const [page, setPageIdx] = useRecoilState(pageIdx);
  const [histoyCnt, setHistoryCnt] = useState(0);
  const [filterModal, setFilterModal] = useRecoilState(throwngFilterModal);
  const resetThrowngFilterState = useResetRecoilState(throwngFilterModal);

  useEffect(() => {
    resetThrowngFilterState();
  }, [page]);

  const filterModalHandler = () => {
    setFilterModal(!filterModal);
  };

  return (
    <div className="MyThrowngHistoryMenu">
      <div className="menu-header">
        <div className="header-btn-div">
          <div
            className={`btn-item ${!page ? "" : "active"}`}
            onClick={() => setPageIdx(false)}
          >
            두기
          </div>
          <div
            className={`btn-item ${page ? "" : "active"}`}
            onClick={() => setPageIdx(true)}
          >
            줍기
          </div>
        </div>
        <div className="song-cnt">전체 {histoyCnt}개</div>
        <div className="filter-div" onClick={filterModalHandler}>
          <div className="filter">
            <div>필터</div>
            <LuListFilter />
          </div>
        </div>
      </div>
      <MyThrowngHistroyList pageIdx={page} setHistoryCnt={setHistoryCnt} />
      {filterModal && <MyThrowngHistoryFilterModal />}
    </div>
  );
};
export default MyThrowngHistoryMenu;
