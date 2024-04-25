import React, { useEffect } from "react";
import "@styles/quiz/QuizTimeBar.scss";

interface QuizTimeBarProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

const QuizTimeBar = ({ timeLeft, setTimeLeft }: QuizTimeBarProps) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeLeft]);

  return (
    <div className="QuizTimeBar">
      <div
        className={`quiz-timer-bar ${timeLeft === 0 ? "timeout" : ""}`}
      ></div>
      <div className="quiz-timer">{timeLeft}</div>
    </div>
  );
};

export default QuizTimeBar;
