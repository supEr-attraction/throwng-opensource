import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizContent } from "@services/contentApi/ContentApi";
import { QuizContent } from "@/types/quizType";

const useQuizRedirect = () => {
  const navigate = useNavigate();
  const [quizStatus, setQuizStatus] = useState<boolean>();

  useEffect(() => {
    const fetchQuizStatus = async () => {
      try {
        const data: QuizContent[] = await getQuizContent();
        const quizData = data.find((content) => content.name === "quiz");
        setQuizStatus(quizData?.status);
      } catch (error) {
        console.error("Failed to fetch quiz status:", error);
      }
    };

    fetchQuizStatus();
  }, []);

  useEffect(() => {
    // 퀴즈 막혀있을 때 
    if (quizStatus) {
      navigate("/content", { replace: true });
    }
  }, [quizStatus, navigate]);
};

export default useQuizRedirect;
