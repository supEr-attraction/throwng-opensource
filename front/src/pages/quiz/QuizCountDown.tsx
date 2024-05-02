import QuizCountDownLottie from "@components/lottie/QuizCountDownLottie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizCountDown = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/quiz/solve')
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
