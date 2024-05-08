import React, { useState } from "react";
import "@styles/quiz/QuizMultipleChoice.scss";


interface Choice {
  id: string;
  text: string;
}

interface QuizMultipleChoiceProps {
  setIsCorrect: (isCorrect: boolean) => void;
  setCanSubmit: (canSubmit: boolean) => void;
  question: string;
  choices: Choice[];
  correctAnswer: string;
  index: number
  previewUrl?: string;
  quizImage?: string;
}

const QuizMultipleChoice: React.FC<QuizMultipleChoiceProps> = ({
  setIsCorrect,
  setCanSubmit,
  question,
  choices,
  correctAnswer,
  index,
  previewUrl,
  quizImage
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoiceClick = (id: string) => {
    setSelectedChoice(id);
    setIsCorrect(id === correctAnswer); 
    setCanSubmit(true);
  };

  return (
    <div className="QuizMultipleChoice">
      <h2>Q{index + 1}. {question}</h2>
      <div className="mc-choice">
        {choices.map((choice) => (
          <div
            key={choice.id}
            className={`choice ${selectedChoice === choice.id ? "selected" : ""}`}
            onClick={() => handleChoiceClick(choice.id)}
          >
            {choice.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizMultipleChoice;
