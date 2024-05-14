import { memo, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { optionModalState, reportModalState } from "@store/music/pick/atoms";
import { SlOptionsVertical } from "react-icons/sl";
import OptionModal from "@components/music/pick/OptionModal";
import ReportModal from "@components/music/pick/ReportModal";
import dayjs from "dayjs";
import { musicPickCommentState } from "@store/music/pick/selectors";

const MusicComment = () => {
  const { thrownDate, content } = useRecoilValue(musicPickCommentState);
  const [optionModal, setOptionModal] = useRecoilState(optionModalState);
  const reportModal = useRecoilValue(reportModalState);

  const formattedDate = useMemo(
    () => dayjs(thrownDate).format("YY.MM.DD"),
    [thrownDate]
  );

  return (
    <>
      <div className="top">
        <div className="option">
          <SlOptionsVertical onClick={() => setOptionModal(true)} />
        </div>
        <div className="content">{content}</div>
        <div className="date">{formattedDate}</div>
      </div>
      {optionModal && <OptionModal />}
      {reportModal && <ReportModal />}
    </>
  );
};

export default memo(MusicComment);
