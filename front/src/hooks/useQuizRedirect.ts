import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getIsCoupon } from "@services/couponApi/IsCouponApi";

export const useCouponAccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCoupon = async () => {
      try {
        const couponData = await getIsCoupon("quiz");
        if (!couponData.couponStatus) {
          // 쿠폰 상태가 false일 때만 /quiz/coupon 페이지로 접근 허용
          navigate("/quiz/coupon", { replace: true });
        } else {
          // 그 외의 경우 /content 페이지로 리디렉션
          navigate("/content", { replace: true });
        }
      } catch (error) {
        console.error("Error during coupon verification:", error);
        navigate("/content", { replace: true });
      }
    };

    verifyCoupon();
  }, [navigate]);
};
