import { useState } from "react";
import "@styles/quiz/QuizOX.scss";

import oImage from "@assets/images/o.webp";
import xImage from "@assets/images/x.webp";

interface QuizOXProps {
  setIsCorrect: (value: boolean) => void;
  setCanSubmit: (canSubmit: boolean) => void;
  question: string;
  correctAnswer: string;
  index: number;
  previewUrl?: string;
  quizImage?: string;
}

const QuizOX = ({
  setIsCorrect,
  setCanSubmit,
  question,
  correctAnswer,
  index,
  previewUrl,
  quizImage
}: QuizOXProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === correctAnswer);
    setCanSubmit(true);
  };

  return (
    <div className="QuizOX">
      <h2>
        Q{index + 1}. {question}
      </h2>{" "}
      {/* Display the question number and the dynamic question */}
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
