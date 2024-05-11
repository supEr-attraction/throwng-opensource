import quizlogo from "@assets/images/quizlogo.webp";
import Header from "@components/Header";
import QuizMainLottie from "@components/lottie/QuizMainLottie";
import "@styles/quiz/QuizMainPage.scss";
import { useNavigate } from "react-router-dom";

const QuizMainPage = () => {
  const navigate = useNavigate();
  const handleGoInfo = () => {
    navigate("/quiz/info", { replace: true });
  };

  return (
    <div>
      <Header />
      <div className="QuizMainPage">
        <div className="quiz-lottie">
          <div className="lottie-main">
            <QuizMainLottie />
          </div>
          <img src={quizlogo} alt="QuizLogo" />
        </div>
        <div className="quiz-main-border">
          <p>
            오늘의 퀴즈에 <br />
            도전하세요!
          </p>
        </div>
        <div className="quiz-button">
          <button onClick={handleGoInfo}>도전</button>
        </div>
      </div>
    </div>
  );
};

export default QuizMainPage;
