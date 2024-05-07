import Header from "@components/Header";
import "@/styles/Content.scss";
import logo from "@/assets/images/backlogo.webp";
import hammer from "@/assets/images/Hammer.webp";
import game2 from "@/assets/images/Rockpaperscissors.webp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ContentPage = () => {
  const navigate = useNavigate();
  const handleGoQuiz = () => {
    navigate('/quiz/main')
  }


  return (
    <div className="ContentPage">
      <Header centerText="컨텐츠" />
      <div className="content-item">
        <div className="quiz-border" onClick={handleGoQuiz}>
          <div className="quiz-title">
            <p>쓰롱-퀴즈</p>
            <div className="participation">
              <p>0/1</p>
            </div>
          </div>
          <div>
            <img src={logo} alt="quiz" />
          </div>
        </div>
        <div className="game1-border">
          <div className="game1-title">
            <p>리듬게임</p>
            <div className="participation">
              <p>1/1</p>
            </div>
          </div>
          <div>
            <img src={hammer} alt="game1" />
          </div>
        </div>
        <div className="game2-border">
          <div className="game2-title">
            <p>가위바위보?</p>
            <div className="participation">
              <p>1/1</p>
            </div>
          </div>
          <div>
            <img src={game2} alt="game2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
