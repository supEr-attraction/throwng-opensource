import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizMultipleChoice from "@components/quiz/QuizMultipleChoice";
import QuizOX from "@components/quiz/QuizOX";
import QuizSubjective from "@components/quiz/QuizSubjective";
import QuizTimeBar from "@components/quiz/QuizTimeBar";
import "@styles/quiz/QuizSolvePage.scss";
import { QuizData } from "@/types/quizType"; 
import getQuizSolve from "@services/quizApi/QuizSolveApi";

const QuizSolvePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await getQuizSolve();
      console.log(data);
      setQuizData(data);
    };
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (quizData.length > 0 && currentQuestionIndex >= quizData.length) {
      navigate("/quiz/success");
    }
  }, [currentQuestionIndex, navigate, quizData]);
  
  useEffect(() => {
    if (timeLeft === 0) {
      // navigate("/quiz/fail");
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
    if (!quizData.length || currentQuestionIndex >= quizData.length) {
      return <div></div>;
    }

    const currentQuiz = quizData[currentQuestionIndex];

    const choices = Array.isArray(currentQuiz.choice) ? currentQuiz.choice : [];

    const props = {
      setIsCorrect,
      setTimeLeft,
      setCanSubmit,
      question: currentQuiz.question,
      choices: choices,
      correctAnswer: currentQuiz.answer,
      index: currentQuestionIndex,
      previewUrl: currentQuiz.previewUrl,
      quizImage: currentQuiz.quizImage
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
};

export default QuizSolvePage;
