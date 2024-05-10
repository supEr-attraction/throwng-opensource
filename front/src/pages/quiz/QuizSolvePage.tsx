import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizMultipleChoice from "@components/quiz/QuizMultipleChoice";
import QuizOX from "@components/quiz/QuizOX";
import QuizSubjective from "@components/quiz/QuizSubjective";
import QuizTimeBar from "@components/quiz/QuizTimeBar";
import "@styles/quiz/QuizSolvePage.scss";
import { QuizData, QuizResult } from "@/types/quizType";
import { getQuizSolve, postQuizSolve } from "@services/quizApi/QuizSolveApi";
import useQuizRedirect from "@hooks/useQuizRedirect";

function QuizSolvePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [userInput, setUserInput] = useState<string | null>(null);
  const navigate = useNavigate();
  useQuizRedirect();

  const handleUserInput = (input: string) => {
    setUserInput(input);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await getQuizSolve();
      console.log(data)
      setQuizData(data);
    };
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (quizData.length > 0 && currentQuestionIndex >= quizData.length) {
      navigate("/quiz/success", { state: { quizPassed: true }, replace: true });
    }
  }, [currentQuestionIndex, navigate, quizData]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmission(null);
      navigate("/quiz/fail", { replace: true });
    }
  }, [timeLeft, navigate]);

  useEffect(() => {
    setCanSubmit(userInput !== null);
  }, [userInput]);

  const handleSubmission = async (submission = userInput) => {
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
      console.log(response); 
      if (response.data.status) {
        goToNextQuestion();
      } else {
        handleFailNavigation();
      }
    } catch (error) {
      console.error("Failed to submit the quiz:", error);
      handleFailNavigation();
    }
  };

  const handleFailNavigation = () => {
    navigate("/quiz/fail", { replace: true });
  };

  const goToNextQuestion = () => {
    setTimeLeft(20);
    setUserInput(null);
    setCanSubmit(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestionComponent = () => {
    if (!quizData.length || currentQuestionIndex >= quizData.length) {
      return <div></div>;
    }


    
    const currentQuiz = quizData[currentQuestionIndex];
    const props = {
      onUserInput: handleUserInput,
      setTimeLeft,
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
        <button
          onClick={() => handleSubmission()}
          className="submission-button"
        >
          제출
        </button>
      )}
    </div>
  );
}

export default QuizSolvePage;
