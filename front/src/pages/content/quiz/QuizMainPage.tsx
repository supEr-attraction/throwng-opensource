import GameMainPage from "@components/content/ContentMainPage";
import quizlogo from "@assets/images/quizlogo.webp";

const QuizMainPage = () => {
  return (
    <GameMainPage
      imageSrc={quizlogo}
      altText="QuizLogo"
      mainText={`오늘의 퀴즈에 <br /> 도전하세요!`}
      infoRoute="/quiz/info"
    />
  );
};

export default QuizMainPage;
