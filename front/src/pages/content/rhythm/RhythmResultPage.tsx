import { useLocation, useNavigate } from "react-router-dom";
import "@/styles/content/rhythm/RhythmResultPage.scss";
import rhythm from "@/assets/images/rhythm.webp";
import QuizCryLottie from "@components/lottie/QuizCryLottie";
import { postContentResult } from "@services/contentResultApi/ContentResultApi";

const RhythmResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;

  const handleSuccessClick = async () => {
    sessionStorage.setItem("scoreAchieved", "true");
    await postContentResult("rhythm");
    navigate("/rhythm/success", { replace: true });
  };

  const handleFailureClick = async () => {
    await postContentResult("rhythm");
    navigate("/rhythm/game", { replace: true });
  };

  return (
    <div className="resultPage">
      {score >= 1600 ? (
        <div className="successContainer">
          <h1>Success</h1>
          <p>Score: {score}</p>
          <img src={rhythm} alt="game" />
          <button className="successButton" onClick={handleSuccessClick}>
            Success
          </button>
        </div>
      ) : (
        <div className="failureContainer">
          <h1>Game Over</h1>
          <p>Score: {score}</p>
          <QuizCryLottie />
          <button className="failureButton" onClick={handleFailureClick}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default RhythmResultPage;
