import { useEffect, useState } from "react";
import QuizOpenLottie from "@components/lottie/QuizOpenLottie";
import QuizPreopenLottie from "@components/lottie/QuizPreopenLottie";
import "@styles/quiz/QuizSuccessPage.scss";
import coupon1 from "@assets/images/coupon1.webp";
import coupon2 from "@assets/images/coupon2.webp";
import coupon3 from "@assets/images/coupon3.webp";
import { useNavigate } from "react-router-dom";

const QuizSuccessPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLottieClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        navigate("/quiz/coupon");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, navigate]);

  return (
    <div className="QuizSuccessPage">
      <div className="quiz-success-header">
        <h2>
          축하합니다 <br />
          모든 문제를 맞췄어요!
        </h2>
        <p className="ment">상자를 클릭하여 쿠폰을 뽑아볼까요?</p>
      </div>
      <div className="quiz-success-lottie" onClick={handleLottieClick}>
        {isOpen ? <QuizOpenLottie /> : <QuizPreopenLottie />}
      </div>
      <div>
        <h3>상자에서 획득 할 수 있는 쿠폰</h3>
        <div className="quiz-success-footer">
          <div className="quiz-success-img">
            <div className="content1">
              <img src={coupon1} alt="abroad" className="img1" />
              <p className="coupon-info">범위 밖 노래 정보 조회</p>
              <p className="coupon-per">(35%)</p>
            </div>
            <div className="content2">
              <img src={coupon2} alt="unlimited" className="img2" />
              <p className="coupon-info">무제한 Throw</p>
              <p className="coupon-per">(40%)</p>
            </div>
            <div className="content3">
              <img src={coupon3} alt="boom" className="img3" />
              <p className="coupon-info">꽝</p>
              <p className="coupon-per">(25%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSuccessPage;
