import Header from "@components/Header";
import "@/styles/content/ContentMainPage.scss";
import { useNavigate } from "react-router-dom";

interface GameMainPageProps {
  lottie?: React.ReactNode;
  imageSrc: string;
  altText: string;
  mainText: string;
  infoRoute: string;
}

const ContentMainPage = ({
  lottie,
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
          <div className="lottie">
          {lottie ? lottie : ""}
          </div>
          <img src={imageSrc} alt={altText} className="img"/>
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

export default ContentMainPage;
