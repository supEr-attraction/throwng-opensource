import Header from "@components/Header";
import QuizCautionLottie from "@components/lottie/QuizCautionLottie";
import QuizInfo from "@components/content/quiz/QuizInfo";
import "@/styles/content/ContentInfoPage.scss";

const QuizInfoPage = () => {
  return (
    <div>
      <Header />
      <div className="InfoPage">
        <div className="info-page">
          <div className="info-header">
            <QuizCautionLottie />
            <p className="heading">안내사항 입니다.</p>
          </div>
          <QuizInfo />
        </div>
      </div>
    </div>
  );
};

export default QuizInfoPage;
