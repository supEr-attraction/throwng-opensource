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
      navigate("/quiz/fail", { replace: true });
    }
  }, [timeLeft, navigate]);

  const handleSubmission = async () => {
    if (!userInput) return; // 사용자 입력이 없으면 아무 것도 하지 않음

    const currentQuiz = quizData[currentQuestionIndex];
    const resultData: QuizResult = {
      quizId: currentQuiz.quizId,
      submit: userInput,
    };

    try {
      const response = await postQuizSolve(resultData);
      if (response.status) {
        goToNextQuestion();
      } else {
        navigate("/quiz/fail", { replace: true });
      }
    } catch (error) {
      console.error("Failed to submit the quiz:", error);
      navigate("/quiz/fail", { replace: true });
    }
  };

  const goToNextQuestion = () => {
    setTimeLeft(20);
    setUserInput(null); // 다음 문제로 넘어갈 때 사용자 입력 초기화
    setCanSubmit(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestionComponent = () => {
    if (!quizData.length || currentQuestionIndex >= quizData.length) {
      return <div></div>;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    const props = {
      onUserInput: handleUserInput, // 사용자 입력을 처리할 콜백 함수 전달
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
