import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContentCoupon } from "@/services/couponApi/CouponApi";
import QuizOpenLottie from "@components/lottie/QuizOpenLottie";
import QuizPreopenLottie from "@components/lottie/QuizPreopenLottie";
import "@styles/quiz/QuizSuccessPage.scss";
import coupon1 from "@assets/images/coupon1.webp";
import coupon2 from "@assets/images/coupon2.webp";
import coupon3 from "@assets/images/coupon3.webp";
import coupon4 from "@assets/images/coupon4.webp";
import coupon5 from "@assets/images/coupon5.webp";
import coupon6 from "@assets/images/coupon6.webp";
import coupon7 from "@assets/images/coupon7.webp";
import boom from "@assets/images/boom.webp";
import { quizCoupon } from "../../types/couponType";

const QuizSuccessPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<quizCoupon | null>(null);

  const navigate = useNavigate();

  const handleLottieClick = async () => {
    console.log("handleLottieClick called");
    setIsOpen(true);
    try {
      console.log("Attempting to fetch coupon");
      const couponData = await getContentCoupon("quiz");
      console.log("API response data:", couponData);
      setCoupon(couponData);
    } catch (error) {
      console.error("Failed to fetch coupon:", error);
    }
  };
  // console.log(coupon)

  useEffect(() => {
    if (isOpen && coupon) {
      const timer = setTimeout(() => {
        navigate("/quiz/coupon", { replace: true });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, coupon, navigate]);

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
            <div className="content">
              <img src={coupon2} alt="abroad" className="img" />
              <p className="coupon-info">무제한 쓰롱</p>
            </div>
            <div className="content">
              <img src={coupon1} alt="unlimited" className="img" />
              <p className="coupon-info">5개 쓰롱 추가</p>
            </div>
            <div className="content">
              <img src={coupon5} alt="boom" className="img" />
              <p className="coupon-info">2배 쓰롱 추가</p>
            </div>
            <div className="content">
              <img src={coupon6} alt="boom" className="img" />
              <p className="coupon-info">레벨 쓰롱 추가</p>
            </div>
          </div>
          <div className="quiz-success-img">
            <div className="content">
              <img src={coupon3} alt="abroad" className="img" />
              <p className="coupon-info">범위 밖 노래 조회</p>
            </div>
            <div className="content">
              <img src={coupon4} alt="unlimited" className="img" />
              <p className="coupon-info">닉네임 변경</p>
            </div>
            <div className="content">
              <img src={coupon7} alt="boom" className="img" />
              <p className="coupon-info">"?" 음악 조회</p>
            </div>
            <div className="content">
              <img src={boom} alt="boom" className="img" />
              <p className="coupon-info">꽝</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSuccessPage;
