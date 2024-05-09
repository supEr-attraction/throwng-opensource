import { PiSiren } from "react-icons/pi";
import { useSetRecoilState } from "recoil";
import { optionModalState, reportModalState } from "@store/music/pick/atoms";
import "@styles/music/pick/OptionModal.scss";

const OptionModal = () => {
  const setReportModal = useSetRecoilState(reportModalState);
  const setOptionModal = useSetRecoilState(optionModalState);

  return (
    <div className="OptionModal">
      <div className="background" onClick={() => setOptionModal(false)} />
      <div className="content">
        <div className="report">
          <PiSiren />
          <div
            onClick={() => {
              setOptionModal(false);
              setReportModal(true);
            }}
          >
            신고하기
          </div>
        </div>
        <button className="close" onClick={() => setOptionModal(false)}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default OptionModal;
