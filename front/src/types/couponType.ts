export interface Coupon {
  couponId: number;
  couponName: string;
  couponDescription: string;
  couponEndDate: string;
  couponStatus: string;
}

export interface quizCoupon {
  couponType: string;
  couponDescription: string;
}

export interface isQuizCoupon {
  couponStatus: boolean;
}