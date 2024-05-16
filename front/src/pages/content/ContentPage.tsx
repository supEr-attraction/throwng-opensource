import Header from "@components/Header";
import "@/styles/content/Content.scss";
import logo from "@/assets/images/backlogo.webp";
import rhythm from "@/assets/images/rhythm.webp";
import memory from "@/assets/images/memory.webp";
import { useNavigate } from "react-router-dom";

const ContentPage = () => {
  const navigate = useNavigate();

  const handleGoQuiz = () => {
    navigate("/quiz/main");
  };

  const handleGoMole = () => {
    navigate("/rhythm/main");
  };

  const handleGoMemory = () => {
    navigate("/memory/main");
  };

  return (
    <div className="ContentPage">
      <Header centerText="컨텐츠" />
      <div className="content-item">
        <div className="quiz-border" onClick={handleGoQuiz}>
          <div className="quiz-title">
            <p>퀴즈-쓰롱</p>
            <div className="participation">
              <p>ON</p>
            </div>
          </div>
          <div>
            <img src={logo} alt="quiz" />
          </div>
        </div>
        <div className="game1-border" onClick={handleGoMole}>
          <div className="game1-title">
            <p>리듬-쓰롱</p>
            <div className="participation">
              <p>ON</p>
            </div>
          </div>
          <div>
            <img src={rhythm} alt="game1" />
          </div>
        </div>
        <div className="game2-border" onClick={handleGoMemory}>
          <div className="game2-title">
            <p>기억력측정</p>
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
