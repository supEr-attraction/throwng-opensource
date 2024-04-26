import { throwngFilterModal } from "@store/myPage/atoms"
import { useSetRecoilState } from "recoil"
import "@styles/myPage/MyThrowngHistoryFilterModal.scss"

const MyThrowngHistoryFilterModal = () => {
  const setIsModal = useSetRecoilState(throwngFilterModal)

  return (
    <div className="MyThrowngHistoryFilterModal">
      <div className="background" onClick={() => setIsModal(false)} />
      
      <div className="modal">
        <div className="header">상세조회</div>
        <hr />

        <div className="body">
          <div className="body-header">조회기간</div>
          <div className="filter-list">
            <div className="filter-item">오늘</div>
            <div className="filter-item">이번 주</div>
            <div className="filter-item">이번 달</div>
            <div className="filter-item">전체</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyThrowngHistoryFilterModal