import { useState } from "react";
import "@styles/quiz/QuizMultipleChoice.scss";

interface Choice {
  id: number;
  text: string;
}

interface QuizMultipleChoiceProps {
  setIsCorrect: (isCorrect: boolean) => void;
  setCanSubmit: (canSubmit: boolean) => void;
  
}

const QuizMultipleChoice = ({ setIsCorrect, setCanSubmit }: QuizMultipleChoiceProps) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  // API
  const question: string = "여기에 객관식 문제 뿌려~~~";
  const choices: Choice[] = [
    { id: 1, text: "보기1" },
    { id: 2, text: "보기2" },
    { id: 3, text: "보기3" },
    { id: 4, text: "보기4" },
  ];
  const correctAnswer = 3;

  const handleChoiceClick = (id: number) => {
    setSelectedChoice(id);
    setIsCorrect(id === correctAnswer);
    setCanSubmit(true)
  };

  return (
    <div className="QuizMultipleChoice">
      <h2>Q1.</h2>
      <div className="mc-question">
        <p>{question}</p>
      </div>
      <div className="mc-choice">
        {choices.map((choice) => (
          <div
            key={choice.id}
            className={`choice ${
              selectedChoice === choice.id ? "selected" : ""
            }`}
            onClick={() => handleChoiceClick(choice.id)}
          >
            {choice.id}. {choice.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizMultipleChoice;
