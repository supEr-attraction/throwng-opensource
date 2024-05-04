import { useState } from 'react';
import "@styles/myCoupon/MyCouponBody.scss";
import dayjs from 'dayjs';

const MyCouponBody = () => {
  const [coupons, setCoupons] = useState([
    {
      couponId:1,
      couponName:"무제한 Throw",
      couponDesc:"1시간 동안 무제한으로 음악을 Throw가 가능해요!",
      couponEndDate:"2024-05-06T00:00:00",
      couponApply: false,
    },
    {
      couponId:2,
      couponName:"무제한 Throw",
      couponDesc:"1시간 동안 무제한으로 음악을 Throw가 가능해요!",
      couponEndDate:"2024-05-10T00:00:00",
      couponApply: false,
    },
    {
      couponId:3,
      couponName:"범위 밖 노래 정보 조회",
      couponDesc:"내 범위구역 밖에 있는 노래들의 상세 정보를 조회할 수 있어요!",
      couponEndDate:"2024-05-06T00:00:00",
      couponApply: false,
    },
    {
      couponId:4,
      couponName:"범위 밖 노래 정보 조회",
      couponDesc:"내 범위구역 밖에 있는 노래들의 상세 정보를 조회할 수 있어요!",
      couponEndDate:"2024-05-05T00:00:00",
      couponApply: true,
    },
  ]);

  const handleChangeApply = (couponId:number) => {
    const isConfirmed = window.confirm("쿠폰을 적용하겠습니까?");
    if (isConfirmed) {
      setCoupons((prevCoupons) => {
        const newCoupons = prevCoupons.map((coupon) => {
          if (coupon.couponId === couponId) {
            if (!prevCoupons.some(c => c.couponName === coupon.couponName && c.couponApply)) {
              return { ...coupon, couponApply: true };
            } else {
              alert('이미 동일한 쿠폰이 적용 중입니다.');
            }
          }
          return coupon;
        });
        return newCoupons;
      });
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
                <div className="coupon-desc">{coupon.couponDesc}</div>
              </div>
              <div className="coupon-apply" onClick={() => !coupon.couponApply && handleChangeApply(coupon.couponId)}>
                <div className={`coupon-apply-btn ${coupon.couponApply && 'coupon-apply-active'}`}>
                  {coupon.couponApply ? "사용 중" : "적용 안됨"}
                </div>
              </div>
              <hr />
              <div className="coupon-end-date">
                <div className={`${isExpiring && 'coupon-end-date-how-imminent'}`}>
                  {`D-${daysLeft}`}
                </div>
                <div className="coupon-end-date-when">{dayjs(coupon.couponEndDate).format('YY/MM/DD')} 00:00:00까지</div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <div>앗</div>
          <div>사용 가능한 쿠폰이 없습니다.</div>
        </div>
      )}
    </div>
  );
};

export default MyCouponBody;