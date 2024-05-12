import { useNavigate } from "react-router-dom";
import "@/styles/quiz/QuizCouponPage.scss";
import { quizCoupon } from "../../types/couponType";
import boom from "@assets/images/boom.webp";
import coupon1 from "@assets/images/coupon1.webp";
import coupon2 from "@assets/images/coupon2.webp";
import coupon3 from "@assets/images/coupon3.webp";
import coupon4 from "@assets/images/coupon4.webp";
import coupon5 from "@assets/images/coupon5.webp";
import coupon6 from "@assets/images/coupon6.webp";
import coupon7 from "@assets/images/coupon7.webp";
import { useEffect, useState } from "react";
import { getContentCoupon } from "@services/couponApi/CouponApi";
import Loading from "@components/Loading";

const MemoryCouponPage = () => {
  const [coupon, setCoupon] = useState<quizCoupon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupon = async () => {
      setLoading(true);
      try {
        const couponData = await getContentCoupon("memory");
        setCoupon(couponData);
      } catch (error) {
        // console.error("Failed to fetch coupon:", error);
      }
      setLoading(false);
    };

    fetchCoupon();
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!coupon) {
    navigate("/content", { replace: true });
    return;
  }

  const handleGoMypage = () => {
    navigate("/user/mycoupons", { replace: true });
  };

  const couponImages: { [key: string]: string } = {
    "반경 밖 노래 조회 쿠폰": coupon3,
    "24시간 무제한 쓰롱 쿠폰": coupon2,
    "레벨 2배 쓰롱 쿠폰": coupon5,
    "레벨만큼 추가 쓰롱 쿠폰": coupon6,
    "쓰롱 5개 추가 쿠폰": coupon1,
    "닉네임 변경 쿠폰": coupon4,
    "꽝": boom,
    "물음표 음악 조회 쿠폰": coupon7,
  };

  const imageSrc = couponImages[coupon.couponType];

  return (
    <div className="QuizCouponPage">
      <div className="quiz-coupon-header">
        <h2>무슨 쿠폰이 나왔을까요?</h2>
      </div>
      <div className="quiz-coupon-img">
        <img src={imageSrc} alt={coupon.couponType} />
        <h2>{coupon.couponType}</h2>
      </div>
      <div className="quiz-coupon-footer">
        <p>{coupon.couponDescription}</p>
      </div>
      <div className="quiz-coupon-button">
        <button onClick={handleGoMypage}>쿠폰함으로 이동</button>
      </div>
    </div>
  );
};

export default MemoryCouponPage;
