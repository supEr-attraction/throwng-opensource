import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizMultipleChoice from "@components/quiz/QuizMultipleChoice";
import QuizOX from "@components/quiz/QuizOX";
import QuizSubjective from "@components/quiz/QuizSubjective";
import QuizTimeBar from "@components/quiz/QuizTimeBar";
import "@styles/quiz/QuizSolvePage.scss";
import { QuizData, QuizResult } from "@/types/quizType";
import { getQuizSolve, postQuizSolve } from "@services/quizApi/QuizSolveApi";

function QuizSolvePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await getQuizSolve();
      const formattedData = data.map((item) => ({
        ...item,
        choice: item.choice
          ? Object.keys(item.choice).map((key) => ({
              id: key,
              //@ts-ignore
              text: item.choice[key],
            }))
          : [],
      }));
      setQuizData(formattedData);
    };
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (quizData.length > 0 && currentQuestionIndex >= quizData.length) {
      navigate("/quiz/success", { replace: true });
    }
  }, [currentQuestionIndex, navigate, quizData]);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/quiz/fail", { replace: true });
    }
  }, [timeLeft, navigate]);

  const handleSubmission = async () => {
    if (isCorrect === null) {
      navigate("/quiz/fail", { replace: true });
      return;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    const resultData: QuizResult = {
      quizId: currentQuiz.quizId,
      submit: currentQuiz.answer,
      result: isCorrect
    };
    
    await postQuizSolve(resultData);

    if (!isCorrect) {
      navigate("/quiz/fail", { replace: true });
    } else {
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    setTimeLeft(20);
    setIsCorrect(null);
    setCanSubmit(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestionComponent = () => {
    if (!quizData.length || currentQuestionIndex >= quizData.length) {
      return <div></div>;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    const props = {
      setIsCorrect,
      setTimeLeft,
      setCanSubmit,
      question: currentQuiz.question,
      choices: currentQuiz.choice,
      correctAnswer: currentQuiz.answer,
      index: currentQuestionIndex,
      previewUrl: currentQuiz.previewUrl,
      quizImage: currentQuiz.quizImage,
    };

    switch (currentQuiz.quizType) {
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
}

export default QuizSolvePage;
