import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getQuizContent } from "@services/contentApi/ContentApi";

const useRestrictQuizSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quizStatus, setQuizStatus] = useState<boolean>();

  useEffect(() => {
    const fetchQuizStatus = async () => {
      try {
        const data = await getQuizContent();
        const quizData = data.find((content) => content.name === "quiz");
        setQuizStatus(quizData?.status); // 퀴즈 상태를 가져옴 (활성화 여부)
      } catch (error) {
        console.error("Failed to fetch quiz status:", error);
      }
    };

    fetchQuizStatus();
  }, []);

  useEffect(() => {
    console.log(location.pathname);  // 상태 로깅하여 확인
    // 퀴즈가 활성화되어 있고, /quiz/success 경로에 있을 때 조건 검사
    if (!quizStatus && location.pathname === '/quiz/success') {
        // quizPassed가 true가 아니라면 /content로 리디렉션
        if (!location.state?.quizPassed) {
            navigate("/content", { replace: true });
            // true라면 성공 반환 해야지 
        } else if (location.state?.quizPassed) {
          navigate("/quiz/success", { replace: true })
        }
    }
}, [quizStatus, location, navigate]);

};

export default useRestrictQuizSuccess;
