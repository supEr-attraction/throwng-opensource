import Header from "@components/Header";
import "@/styles/Content.scss";
import logo from "@/assets/images/backlogo.webp";
import hammer from "@/assets/images/Hammer.webp";
import memory from "@/assets/images/memory.webp"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizContent } from "@services/contentApi/ContentApi";
import { QuizContent } from "@/types/quizType";
import Loading from "@components/Loading";

const ContentPage = () => {
  const navigate = useNavigate();
  const [quizContents, setQuizContents] = useState<QuizContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizContents = async () => {
      try {
        const data: QuizContent[] = await getQuizContent();
        setQuizContents(
          data.map((content) => ({
            ...content,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch quiz contents:", error);
      }
    };

    fetchQuizContents();
  }, []);

  const handleGoQuiz = () => {
    navigate("/quiz/main");
  };

  const handleGoMole = () => {
    navigate("/mole/game")
  }

  const handleGoMemory = () => {
    navigate("/memory/main")
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="ContentPage">
      <Header centerText="컨텐츠" />
      <div className="content-item">
        {quizContents.map(
          (content) =>
            content.name === "quiz" && (
              <div
                key={content.name}
                className={`quiz-border`}
                onClick={() => handleGoQuiz()}
              >
                <div className="quiz-title">
                  <p>쓰롱-퀴즈</p>
                  <div className={`participation`}>
                    <p>ON</p>
                  </div>
                </div>
                <div>
                  <img src={logo} alt="quiz" />
                </div>
              </div>
            )
        )}
        <div className="game1-border" onClick={handleGoMole}>
          <div className="game1-title">
            <p>리듬게임</p>
            <div className="participation">
              <p>준비중</p>
            </div>
          </div>
          <div>
            <img src={hammer} alt="game1" />
          </div>
        </div>
        <div className="game2-border" onClick={handleGoMemory}>
          <div className="game2-title">
            <p>기억력 측정</p>
            <div className="participation">
              <p>ON</p>
            </div>
          </div>
          <div>
            <img src={memory} alt="game2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
