import Header from "@components/Header";
import MemoryInfo from "@components/content/memory/MemoryInfo";
import QuizCautionLottie from "@components/lottie/QuizCautionLottie";
import "@/styles/content/ContentInfoPage.scss";

const MemoryInfoPage = () => {
  return (
    <div>
      <Header />
      <div className="InfoPage">
        <div className="info-page">
          <div className="info-header">
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
