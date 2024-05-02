import QuizCryLottie from "@components/lottie/QuizCryLottie";
import "@styles/quiz/QuizFailPage.scss";
import { useNavigate } from "react-router-dom";

const QuizFailPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="QuizFailPage">
      <div className="quiz-fail-header">
        <h2>
          앗, 너무 아쉬워요! <br /> 다음엔 꼭 다 맞출거에요
        </h2>
      </div>
      <div className="quiz-fail-lottie">
        <QuizCryLottie />
      </div>
      <div className="quiz-fail-footer">
        <p>매일 퀴즈가 <br />깜짝 등장 합니다.</p>
        <p>또 도전 해 주실거죠??</p>
      </div>
      <div className="quiz-fail-button">
        <button onClick={handleGoHome}>메인으로 이동</button>
      </div>
    </div>
  );
};

export default QuizFailPage;
