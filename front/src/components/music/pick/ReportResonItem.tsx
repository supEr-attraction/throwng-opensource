import { toastMsg } from "@/utils/toastMsg";
import { reportModalState } from "@store/music/pick/atoms";
import { useSetRecoilState } from "recoil";

const ReportResonItem = ({ content }: { content: string }) => {
  const setReportModal = useSetRecoilState(reportModalState);

  const reporting = () => {
    toastMsg("신고 완료");
    setReportModal(false);
  };

  return <li onClick={reporting}>{content}</li>;
};

export default ReportResonItem;
