import GameMainPage from "@components/content/ContentMainPage";
import quizlogo from "@assets/images/quizlogo.webp";
import QuizMainLottie from "@components/lottie/QuizMainLottie";

const QuizMainPage = () => {
  return (
    <GameMainPage
      lottie={<QuizMainLottie />}
      imageSrc={quizlogo}
      altText="QuizLogo"
      mainText={`오늘의 퀴즈에 <br /> 도전하세요!`}
      infoRoute="/quiz/info"
    />
  );
};

export default QuizMainPage;
