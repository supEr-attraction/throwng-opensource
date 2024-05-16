import { useEffect, useState } from "react";
import "@styles/myCoupon/MyCouponBody.scss";
import dayjs from "dayjs";
import { Coupon } from "../../types/couponType";
import { getMyCoupon, postMyCoupon } from "@services/myCouponApi/MyCouponAPi";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { changeNickNameCouponId } from "@store/myPage/atoms";
import Loading from "@components/Loading";
import ToasterMsg from "@components/ToasterMsg";
import { toastMsg } from "@/utils/toastMsg";

const MyCouponBody = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const navigate = useNavigate();
  const setChangeNickNameCouponId = useSetRecoilState(changeNickNameCouponId);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchGetMyCoupon();
  }, []);

  const fetchGetMyCoupon = async () => {
    const res = await getMyCoupon();
    setCoupons(res);
    setIsLoading(false);
  };

  const handleChangeApply = async (couponId: number) => {
    const selectedCoupon = coupons.find(coupon => coupon.couponId === couponId);
    if (!selectedCoupon) return;
  
    const isConfirmed = window.confirm(`${selectedCoupon.couponName}을 적용하시겠어요?`);
    if (isConfirmed) {
      if (selectedCoupon.couponName === "닉네임 변경 쿠폰") {
        setChangeNickNameCouponId(selectedCoupon.couponId);
        navigate("/user/mypage/change-nickname");
        return;
      }
  
      const isCouponInUse = coupons.some(
        coupon =>
          coupon.couponName === selectedCoupon.couponName &&
          coupon.couponStatus === "사용 중"
      );
      if (isCouponInUse) {
        toastMsg("동일한 쿠폰을 사용중이에요");
        return;
      }
  
      const throwngTypes = ["THROWNG_INF", "THROWNG_TWICE", "THROWNG_LEVEL", "THROWNG_FIVE"];
      if (throwngTypes.includes(selectedCoupon.couponType)) {
        const isSameTypeCouponInUse = coupons.some(
          coupon =>
            throwngTypes.includes(coupon.couponType) &&
            coupon.couponStatus === "사용 중"
        );
        if (isSameTypeCouponInUse) {
          toastMsg("같은 유형의 쿠폰을 사용중이에요");
          return;
        }
      }
  
      const requestBody = {
        couponId: couponId,
        couponType: selectedCoupon.couponType,
      };
  
      try {
        await postMyCoupon(requestBody);
        fetchGetMyCoupon();
        toastMsg("쿠폰이 정상적으로 적용되었습니다.");
      } catch (error) {
        toastMsg("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };
  

  return (
    <div className="MyCouponBody">
      {isLoading ? (
        <Loading />
      ) : coupons.length > 0 ? (
        coupons.map((coupon) => {
          const daysLeft = Math.ceil(
            dayjs(coupon.couponEndDate).diff(dayjs(), "day", true)
          );
          const isExpiring = daysLeft <= 1;
          return (
            <div key={coupon.couponId} className="coupon-body">
              <div className="coupon-header">
                <div className="coupon-title">{coupon.couponName}</div>
                <div className="coupon-desc">{coupon.couponDescription}</div>
              </div>
              <div className="btn-div">
                <div
                  className={`coupon-apply ${
                    coupon.couponStatus === "사용 전" ? "" : "inactive"
                  }`}
                  onClick={() =>
                    coupon.couponStatus === "사용 전" &&
                    handleChangeApply(coupon.couponId)
                  }
                >
                  <div
                    className={`coupon-apply-btn ${
                      coupon.couponStatus !== "사용 전" && "coupon-apply-active"
                    }`}
                  >
                    {coupon.couponStatus}
                  </div>
                </div>
              </div>
              <hr />
              <div className="coupon-end-date">
                <div
                  className={`${isExpiring && "coupon-end-date-how-imminent"}`}
                >
                  {`D-${daysLeft}`}
                </div>
                <div className="coupon-end-date-when">
                  {dayjs(coupon.couponEndDate).format("YY/MM/DD HH:mm:ss")}까지
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="SearchedWords">
          <div className="no-word-container">
            <div className="title">앗!</div>
            <div className="subtitle">사용 가능한 쿠폰이 없습니다.</div>
          </div>
        </div>
      )}
      <ToasterMsg />
    </div>
  );
};

export default MyCouponBody;
