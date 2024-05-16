import { useEffect, useState } from "react";
import "@/styles/content/quiz/QuizTimeBar.scss";

interface QuizTimeBarProps {
  initialTime: number;
  onTimeOut: () => void;
}

const QuizTimeBar = ({ initialTime, onTimeOut }: QuizTimeBarProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          onTimeOut();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeOut]);

  return (
    <div className="QuizTimeBar">
      <div className={`quiz-timer-bar ${timeLeft === 0 ? "timeout" : ""}`}></div>
      <div className="quiz-timer">{timeLeft}</div>
    </div>
  );
};

export default QuizTimeBar;
