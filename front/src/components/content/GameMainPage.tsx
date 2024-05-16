import Header from "@components/Header";
import "@/styles/content/GameMainPage.scss";
import { useNavigate } from "react-router-dom";

interface GameMainPageProps {
  imageSrc: string;
  altText: string;
  mainText: string;
  infoRoute: string;
}

const GameMainPage = ({
  imageSrc,
  altText,
  mainText,
  infoRoute,
}: GameMainPageProps) => {
  const navigate = useNavigate();
  const handleGoInfo = () => {
    navigate(infoRoute, { replace: true });
  };

  return (
    <div>
      <Header />
      <div className="GameMainPage">
        <div className="game-lottie">
          <img src={imageSrc} alt={altText} />
        </div>
        <div className="game-main-border">
          <p dangerouslySetInnerHTML={{ __html: mainText }} />
        </div>
        <div className="game-button">
          <button onClick={handleGoInfo}>도전</button>
        </div>
      </div>
    </div>
  );
};

export default GameMainPage;
