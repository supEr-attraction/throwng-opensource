import { useEffect, useState } from "react";
import "@styles/myPage/MyThrowngHistoryMenu.scss";
import MyThrowngHistroyList from "./MyThrowngHistroyList";
import { LuListFilter } from "react-icons/lu";
import MyThrowngHistoryFilterModal from "./MyThrowngHistoryFilterModal";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  myPickHistoryList,
  myThrowHistoryList,
  pageIdx,
  throwngFilterModal,
} from "@store/myPage/atoms";
import {
  getMyDropHistory,
  getMyPickHistory,
} from "@services/myPageHistoryApi/MyPageHistoryApi";
import Loading from "@components/Loading";

const MyThrowngHistoryMenu = () => {
  const [page, setPageIdx] = useRecoilState(pageIdx);
  const [histoyCnt, setHistoryCnt] = useState(0);
  const [filterModal, setFilterModal] = useRecoilState(throwngFilterModal);
  const resetThrowngFilterState = useResetRecoilState(throwngFilterModal);
  const setThrownHistoryList = useSetRecoilState(myThrowHistoryList);
  const setPickHistoryList = useSetRecoilState(myPickHistoryList);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    resetThrowngFilterState();
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setIsLoading(true);
    if (page) {
      const pickData = await getMyPickHistory();
      setPickHistoryList(pickData);
      setIsLoading(false);
    } else {
      const thownData = await getMyDropHistory();
      setThrownHistoryList(thownData);
      setIsLoading(false);
    }
  };

  const filterModalHandler = () => {
    setFilterModal(!filterModal);
  };

  return (
    <div className="MyThrowngHistoryMenu">
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
export default MyThrowngHistoryMenu;
