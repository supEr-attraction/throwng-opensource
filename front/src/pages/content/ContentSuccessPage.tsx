import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizOpenLottie from "@components/lottie/QuizOpenLottie";
import QuizPreopenLottie from "@components/lottie/QuizPreopenLottie";
import "@styles/content/ContentSuccessPage.scss";
import coupon1 from "@assets/images/coupon1.webp";
import coupon2 from "@assets/images/coupon2.webp";
import coupon3 from "@assets/images/coupon3.webp";
import coupon4 from "@assets/images/coupon4.webp";
import coupon5 from "@assets/images/coupon5.webp";
import coupon6 from "@assets/images/coupon6.webp";
import coupon7 from "@assets/images/coupon7.webp";
import boom from "@assets/images/boom.webp";
import { getIsCoupon } from "@services/couponApi/IsCouponApi";
import useSessionValidation from "@hooks/content/useSessionValidation";

const ContentSuccessPage = () => {
  const { type } = useParams<{ type?: string }>();
  useSessionValidation(
    type === "rhythm" ? "scoreAchieved" : "quizCompleted",
    "/content"
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCouponValidity = async () => {
      try {
        if (type) {
          const couponData = await getIsCoupon(type);
          if (couponData.couponStatus) {
            navigate("/close", { replace: true });
          } else {
            navigate(`/${type}/coupon`, { replace: true });
          }
        }
      } catch (e) {
        console.error("Error checking coupon validity:", e);
      }
    };

    if (isOpen) {
      const timer = setTimeout(() => {
        checkCouponValidity();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, navigate, type]);

  const handleLottieClick = () => {
    setIsOpen(true);
  };

  const getHeaderMessage = () => {
    switch (type) {
      case "quiz":
        return "축하합니다! 모든 문제를 맞췄어요!";
      case "memory":
        return "축하합니다! 정말 똑똑하군요!";
      case "rhythm":
        return "축하합니다! 당신의 리듬감 무엇!?";
      default:
        return "축하합니다!";
    }
  };

  return (
    <div className="SuccessPage">
      <div className="success-header">
        <h2>{getHeaderMessage()}</h2>
        <p className="ment">상자를 클릭하여 쿠폰을 뽑아볼까요?</p>
      </div>
      <div className="success-lottie" onClick={handleLottieClick}>
        {isOpen ? <QuizOpenLottie /> : <QuizPreopenLottie />}
      </div>
      <div>
        <h3>상자에서 획득 할 수 있는 쿠폰</h3>
        <div className="success-footer">
          <div className="success-img">
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
          <div className="success-img">
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

export default ContentSuccessPage;
