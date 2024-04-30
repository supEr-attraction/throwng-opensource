import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizMultipleChoice from "@components/quiz/QuizMultipleChoice";
import QuizOX from "@components/quiz/QuizOX";
import QuizSubjective from "@components/quiz/QuizSubjective";
import QuizTimeBar from "@components/quiz/QuizTimeBar";
import "@styles/quiz/QuizSolvePage.scss";

const QuizSolvePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionType, setQuestionType] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<any>(20);
  const navigate = useNavigate();

  // API
  const questionTypes = ["객관식", "주관식", "OX"];

  useEffect(() => {
    if (currentQuestionIndex >= questionTypes.length) {
      navigate("/quiz/success");
    } else {
      setQuestionType(questionTypes[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, navigate]);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/quiz/fail");
    }
  }, [timeLeft, navigate]);

  const handleSubmission = () => {
    if (isCorrect === null) {
      navigate("/quiz/fail");
      return;
    }

    if (!isCorrect) {
      navigate("/quiz/fail");
    } else {
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    setTimeLeft(20);
    setCanSubmit(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestionComponent = () => {
    const props = { setIsCorrect, setTimeLeft, setCanSubmit };
    switch (questionType) {
      case "객관식":
        return <QuizMultipleChoice {...props} />;
      case "주관식":
        return <QuizSubjective {...props} />;
      case "OX":
        return <QuizOX {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="QuizSolvePage">
      <QuizTimeBar
        key={currentQuestionIndex}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
      />
      {renderQuestionComponent()}
      {canSubmit && (
        <button onClick={handleSubmission} className="submission-button">
          제출
        </button>
      )}
    </div>
  );
};

export default QuizSolvePage;
