import ReportResonItem from "@components/music/pick/ReportResonItem";
import { reportModalState } from "@store/music/pick/atoms";
import { useSetRecoilState } from "recoil";
import "@styles/music/pick/ReportModal.scss";

const REPORT_RESONS = [
  "마음에 들지 않습니다",
  "스팸",
  "혐호 발언 또는 상징",
  "불법 또는 규제 상품 판매",
  "기타 문제",
];

const ReportModal = () => {
  const setReportModal = useSetRecoilState(reportModalState);

  return (
    <div className="ReportModal">
      <div className="background" onClick={() => setReportModal(false)} />
      <div className="container">
        <div className="report">신고</div>
        <hr />
        <div className="content">
          <div className="title">
            <div>이 음악을 신고하는 이유</div>
            <div>회원님의 신고는 익명으로 처리됩니다.</div>
          </div>
          <ul className="reson">
            {REPORT_RESONS.map((reson) => (
              <ReportResonItem key={reson} content={reson} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
