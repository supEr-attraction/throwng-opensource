import { useState } from "react";
import "@styles/quiz/QuizOX.scss";

import oImage from "@assets/images/o.webp";
import xImage from "@assets/images/x.webp";

interface QuizOXProps {
  setIsCorrect: (value: boolean | null) => void;
  setCanSubmit: (canSubmit: boolean) => void;
}

const QuizOX = ({ setIsCorrect, setCanSubmit }: QuizOXProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // API
  const question = "여기에 OX문제 뿌려~~";
  const correctAnswer = "O";

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === correctAnswer);
    setCanSubmit(true)
  };

  return (
    <div className="QuizOX">
      <h2>Q3.</h2>
      <div className="ox-question">{question}</div>
      <div className="ox-answers">
        <div
          className={`o-answer ${selectedAnswer === "O" ? "selected" : ""}`}
          onClick={() => handleAnswerClick("O")}
        >
          <img src={oImage} alt="O" />
        </div>
        <div
          className={`x-answer ${selectedAnswer === "X" ? "selected" : ""}`}
          onClick={() => handleAnswerClick("X")}
        >
          <img src={xImage} alt="X" />
        </div>
      </div>
    </div>
  );
};

export default QuizOX;
