import quizlogo from "@assets/images/quizlogo.webp";
import QuizInfo from "@components/quiz/QuizInfo";
import "@styles/quiz/QuizMain.scss";

const QuizMainPage = () => {
  return (
    <div className="QuizMainPage">
      <div className="quiz-header">
        <img src={quizlogo} alt="QuizLogo" />
        <p>
          하루 한 번 현재 페이지에서만 <br />풀 수 있는 특별한 기회!
        </p>
      </div>
      <div className="quiz-info">
        <QuizInfo />
      </div>
    </div>
  );
};

export default QuizMainPage;
