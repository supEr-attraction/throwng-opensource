import { useNavigate } from "react-router-dom";
import coupon from "@/assets/images/coupon2.webp"
import "@/styles/quiz/QuizCouponPage.scss"

const QuizCouponPage = () => {
  const navigate = useNavigate();
  const handleGoMypage = () => {
    navigate("/user/mypage")
  }
  
  return (
    <div className="QuizCouponPage">
      {/* api */}
      <div className="quiz-coupon-header">
        <h2>당신은 행운아 <br />가장 좋은 쿠폰을 뽑았어요!</h2>
      </div>
      <div className="quiz-coupon-img">
        <img src={coupon} alt="" />
        <h2>1시간 동안 무제한 Throw</h2>
      </div>
      <div className="quiz-coupon-footer">
        <p>쿠폰을 사용해서 사람들이 <br />당신의 노래를 들을 수 있도록 <br />많이 던져주세요!</p><br />
        <p>쿠폰을 확인하러 가 볼까요?</p>
      </div>
      <div className="quiz-coupon-button">
        <button onClick={handleGoMypage}>쿠폰함으로 이동</button>
      </div>
    </div>
  );
};

export default QuizCouponPage;