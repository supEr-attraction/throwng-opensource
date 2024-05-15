import Header from "@components/Header";
import RhythmInfo from "@components/game/RhythmInfo";
import QuizCautionLottie from "@components/lottie/QuizCautionLottie";
import "@styles/game/MemoryInfoPage.scss";

const RhythmInfoPage = () => {
  return (
    <div>
      <Header />
      <div className="MemoryInfoPage">
        <div className="memory-info-page">
          <div className="memory-info-header">
            <QuizCautionLottie />
            <p className="heading">안내사항 입니다.</p>
          </div>
          <RhythmInfo />
        </div>
      </div>
    </div>
  );
};

export default RhythmInfoPage;
