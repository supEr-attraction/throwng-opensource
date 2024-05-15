import Header from "@components/Header";
import "@styles/game/MemoryMainPage.scss";
import { useNavigate } from "react-router-dom";
import rhythm from "@/assets/images/rhythm.webp";

const RhythmMainPage = () => {
  const navigate = useNavigate();
  const handleGoInfo = () => {
    navigate("/rhythm/info", { replace: true });
  };

  return (
    <div>
      <Header />
      <div className="MemoryMainPage">
        <div className="quiz-lottie">
          <img src={rhythm} alt="QuizLogo" />
        </div>
        <div className="quiz-main-border">
          <p>
            리듬-쓰롱을 통해서 <br />
            당신의 리듬감을 테스트 해보세요!
          </p>
        </div>
        <div className="quiz-button">
          <button onClick={handleGoInfo}>도전</button>
        </div>
      </div>
    </div>
  );
};

export default RhythmMainPage;
