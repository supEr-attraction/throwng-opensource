import { useEffect, useState } from "react";
import "@/styles/content/quiz/QuizOX.scss";

import oImage from "@assets/images/o.webp";
import xImage from "@assets/images/x.webp";

interface QuizOXProps {
  setCanSubmit: (canSubmit: boolean) => void;
  question: string;
  index: number;
  onUserInput: (input: string) => void;
}

const QuizOX = ({
  onUserInput,
  setCanSubmit,
  question,
  index,
}: QuizOXProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    setSelectedAnswer("");
    setCanSubmit(false);
  }, [index]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setCanSubmit(true);
    onUserInput(answer)
  };

  return (
    <div className="QuizOX">
      <h2>Q{index + 1}.</h2>
      <div className="ox-question">
        <p>{question}</p>
      </div>
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
