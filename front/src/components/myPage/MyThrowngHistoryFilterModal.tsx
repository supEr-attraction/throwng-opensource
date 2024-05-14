import { useEffect } from "react";
import { throwngFilter, throwngFilterModal } from "@store/myPage/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import "@styles/myPage/MyThrowngHistoryFilterModal.scss";

const MyThrowngHistoryFilterModal = () => {
  const setIsModal = useSetRecoilState(throwngFilterModal);
  const [isFilter, setIsFilter] = useRecoilState(throwngFilter);

  const handleFilterClick = (filter: string) => {
    setIsFilter(filter);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="MyThrowngHistoryFilterModal">
      <div className="background" onClick={() => setIsModal(false)} />
      <div className="modal">
        <div className="header">상세조회</div>
        <hr />
        <div className="body">
          <div className="body-header">조회기간</div>
          <div className="filter-list">
            {["오늘", "이번 주", "이번 달", "전체"].map((filter) => (
              <div
                key={filter}
                className={`filter-item ${
                  isFilter === filter ? "selected" : ""
                }`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyThrowngHistoryFilterModal;
