import { useState, ChangeEvent } from "react";
import "@styles/quiz/QuizSubjective.scss";

interface QuizSubjectiveProps {
  setIsCorrect: (value: boolean | null) => void;
  setCanSubmit: (canSubmit: boolean) => void;
}

const QuizSubjective = ({
  setIsCorrect,
  setCanSubmit,
}: QuizSubjectiveProps) => {
  const [userAnswer, setUserAnswer] = useState<string>("");

  //API
  const question = "여기에 주관식 문제 뿌려뿌려~";
  const correctAnswer = "정답";

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    setUserAnswer(answer);
    setCanSubmit(answer.trim() !== "");
  };

  const checkAnswer = () => {
    const isValid = userAnswer.trim() === correctAnswer;
    setIsCorrect(isValid);
  };

  return (
    <div className="QuizSubjective">
      <h2>Q2.</h2>
      <div className="sub-question">{question}</div>
      <h2>정답 입력</h2>
      <input
        type="text"
        placeholder="정답을 입력 해 주세요."
        className="sub-answer"
        value={userAnswer}
        onChange={handleAnswerChange}
        onBlur={checkAnswer}
      />
    </div>
  );
};

export default QuizSubjective;
