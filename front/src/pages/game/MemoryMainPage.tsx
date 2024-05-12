import Header from "@components/Header";
import "@styles/game/MemoryMainPage.scss";
import { useNavigate } from "react-router-dom";
import memory from "@/assets/images/memory.webp";

const MemoryMainPage = () => {
  const navigate = useNavigate();
  const handleGoInfo = () => {
    navigate("/memory/info", { replace: true });
  };

  return (
    <div>
      <Header />
      <div className="MemoryMainPage">
        <div className="quiz-lottie">
          <img src={memory} alt="QuizLogo" />
        </div>
        <div className="quiz-main-border">
          <p>
            도전 하지마세요 <br />
            당신의 하루가 날아갈 수 있습니다.
          </p>
        </div>
        <div className="quiz-button">
          <button onClick={handleGoInfo}>도전</button>
        </div>
      </div>
    </div>
  );
};

export default MemoryMainPage;
