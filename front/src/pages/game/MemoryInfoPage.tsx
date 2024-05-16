import Header from "@components/Header";
import MemoryInfo from "@components/game/MemoryInfo";
import QuizCautionLottie from "@components/lottie/QuizCautionLottie";
import "@styles/game/MemoryInfoPage.scss";

const MemoryInfoPage = () => {
  return (
    <div>
      <Header />
      <div className="MemoryInfoPage">
        <div className="memory-info-page">
          <div className="memory-info-header">
            <QuizCautionLottie />
            <p className="heading">안내사항 입니다.</p>
          </div>
          <MemoryInfo />
        </div>
      </div>
    </div>
  );
};

export default MemoryInfoPage;
