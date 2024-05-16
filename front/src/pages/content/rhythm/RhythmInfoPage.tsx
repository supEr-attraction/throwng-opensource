import Header from "@components/Header";
import RhythmInfo from "@components/content/rhythm/RhythmInfo";
import QuizCautionLottie from "@components/lottie/QuizCautionLottie";
import "@/styles/content/ContentInfoPage.scss";

const RhythmInfoPage = () => {
  return (
    <div>
      <Header />
      <div className="InfoPage">
        <div className="info-page">
          <div className="info-header">
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
