import QuizCountDownLottie from "@components/lottie/QuizCountDownLottie";
import useQuizRedirect from "@hooks/useQuizRedirect";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizCountDown = () => {
  const navigate = useNavigate()
  useQuizRedirect();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/quiz/solve', { replace: true })
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="QuizCountDown">
      <QuizCountDownLottie />
    </div>
  );
};

export default QuizCountDown;
