import QuizCautionLottie from "@components/lottie/QuizCautionLottie";
import QuizInfo from "@components/quiz/QuizInfo";
import "@styles/quiz/QuizInfoPage.scss";

const QuizInfoPage = () => {
  return (
    <div className="QuizInfoPage">
      <div className="quiz-info-page">
        <div className="quiz-info-header">
          <QuizCautionLottie />
          <p className="heading">안내사항 입니다.</p>
        </div>
        <QuizInfo />
      </div>
    </div>
  );
};

export default QuizInfoPage;
