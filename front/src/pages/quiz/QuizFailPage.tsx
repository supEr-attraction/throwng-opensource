import QuizCryLottie from "@components/lottie/QuizCryLottie";
import "@styles/quiz/QuizFailPage.scss";
import { useNavigate } from "react-router-dom";

const QuizFailPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  const handleGoRetry = () => {
    navigate("/quiz/solve", { replace: true });
  };

  return (
    <div className="QuizFailPage">
      <div className="quiz-fail-header">
        <h2>앗, 너무 아쉬워요!</h2>
      </div>
      <div className="quiz-fail-lottie">
        <QuizCryLottie />
      </div>
      <div className="quiz-fail-footer">
        <p>다시 풀어볼까요?</p>
      </div>
      <div className="quiz-fail-button">
        <button onClick={handleGoRetry}>재도전</button>
        <button onClick={handleGoHome}>메인으로 이동</button>
      </div>
    </div>
  );
};

export default QuizFailPage;
