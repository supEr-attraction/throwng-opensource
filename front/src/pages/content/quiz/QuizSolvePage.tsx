import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuizMultipleChoice from "@components/content/quiz/QuizMultipleChoice";
import QuizOX from "@components/content/quiz/QuizOX";
import QuizSubjective from "@components/content/quiz/QuizSubjective";
import QuizTimeBar from "@components/content/quiz/QuizTimeBar";
import "@/styles/content/quiz/QuizSolvePage.scss";
import { QuizData, QuizResult } from "@/types/quizType";
import { getQuizSolve, postQuizSolve } from "@services/quizApi/QuizSolveApi";

function QuizSolvePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUserInput = useCallback((input: string) => {
    setUserInput(input);
  }, []); 

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await getQuizSolve();
      setQuizData(data);
    };
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (quizData.length > 0 && currentQuestionIndex >= quizData.length) {
      navigate("/quiz/success", { replace: true });
    }
  }, [currentQuestionIndex, navigate, quizData]);

  useEffect(() => {
    setCanSubmit(userInput !== null);
  }, [userInput]);

  const handleTimeOut = useCallback(() => {
    handleSubmission(null);
    navigate("/quiz/fail", { replace: true });
  }, [navigate]); 

  const handleSubmission = useCallback(async (submission = userInput) => {
    if (submission === null) {
      submission = null;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    const resultData: QuizResult = {
      quizId: currentQuiz.quizId,
      submit: submission,
    };

    try {
      const response = await postQuizSolve(resultData);
      if (currentQuestionIndex === quizData.length - 1) {
        sessionStorage.setItem("quizCompleted", "true");
      }

      if (response.data.status) {
        if (currentQuestionIndex === quizData.length - 1) {
          sessionStorage.setItem("quizCompleted", "true");
        }
        goToNextQuestion();
      } else {
        handleFailNavigation();
      }
    } catch (error) {
      console.error("Failed to submit the quiz:", error);
      handleFailNavigation();
      // throw new Error('QuizSolvePage');
    }
  }, [userInput, currentQuestionIndex, quizData, navigate]); 

  const handleFailNavigation = useCallback(() => {
    navigate("/quiz/fail", { replace: true });
  }, [navigate]); 

  const goToNextQuestion = useCallback(() => {
    setUserInput(null);
    setCanSubmit(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }, [currentQuestionIndex]); 

  const renderQuestionComponent = useCallback(() => {
    if (!quizData.length || currentQuestionIndex >= quizData.length) {
      return <div></div>;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    const props = {
      onUserInput: handleUserInput,
      setCanSubmit,
      question: currentQuiz.question,
      choices: currentQuiz.choice,
      index: currentQuestionIndex,
      previewUrl: currentQuiz.previewUrl,
      quizImage: currentQuiz.quizImage,
    };

    switch (currentQuiz.quizType) {
      case "객관식":
        //@ts-ignore
        return <QuizMultipleChoice {...props} />;
      case "주관식":
        return <QuizSubjective {...props} />;
      case "OX":
        return <QuizOX {...props} />;
      default:
        return null;
    }
  }, [currentQuestionIndex, handleUserInput, quizData]); 

  return (
    <div className="QuizSolvePage">
      <QuizTimeBar key={currentQuestionIndex} initialTime={20} onTimeOut={handleTimeOut} />
      {renderQuestionComponent()}
      {canSubmit && (
        <button onClick={() => handleSubmission()} className="submission-button">
          제출
        </button>
      )}
    </div>
  );
}

export default QuizSolvePage;
