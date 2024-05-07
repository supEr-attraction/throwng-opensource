import { useEffect, useState } from 'react';
import "@styles/myCoupon/MyCouponBody.scss";
import dayjs from 'dayjs';
import { Coupon } from '../../types/couponType';
import { getMyCoupon, postMyCoupon } from '@services/myCouponApi/MyCouponAPi';

const MyCouponBody = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    fetchGetMyCoupon();
  }, [])

  const fetchGetMyCoupon = async () => {
    const res = await getMyCoupon();
    setCoupons(res)
  }

  const handleChangeApply = async (couponId: number) => {
    const isConfirmed = window.confirm("쿠폰을 적용하시겠습니까?");
    if (isConfirmed) {
      const selectedCoupon = coupons.find(coupon => coupon.couponId === couponId);
      if (!selectedCoupon) return;
      const isCouponInUse = coupons.some(coupon => coupon.couponName === selectedCoupon.couponName && coupon.couponStatus === "사용 중");
      if (isCouponInUse) {
        alert("이미 같은 쿠폰을 사용중입니다.");
        return;
      }
      await postMyCoupon(couponId);
      fetchGetMyCoupon();
    }
  };

  return (
    <div className="MyCouponBody">
      {coupons.length > 0 ? (
        coupons.map((coupon) => {
          const daysLeft = dayjs(coupon.couponEndDate).diff(dayjs(), 'day');
          const isExpiring = daysLeft <= 3;
          return (
            <div key={coupon.couponId} className="coupon-body">
              <div className="coupon-header">
                <div className="coupon-title">{coupon.couponName}</div>
                <div className="coupon-desc">{coupon.couponDescription}</div>
              </div>
              <div className={`coupon-apply ${coupon.couponStatus === "사용 전" ? '' : 'inactive'}`} onClick={() => coupon.couponStatus === "사용 전" && handleChangeApply(coupon.couponId)}>
                <div className={`coupon-apply-btn ${coupon.couponStatus !== "사용 전" && 'coupon-apply-active'}`}>
                  {coupon.couponStatus}
                </div>
              </div>
              <hr />
              <div className="coupon-end-date">
                <div className={`${isExpiring && 'coupon-end-date-how-imminent'}`}>
                  {`D-${daysLeft}`}
                </div>
                <div className="coupon-end-date-when">{dayjs(coupon.couponEndDate).format('YY/MM/DD HH:mm:ss')}까지</div>
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
    </div>
  );
};

export default MyCouponBody;