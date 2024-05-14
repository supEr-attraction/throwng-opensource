export interface Coupon {
  couponId: number;
  couponName: string;
  couponDescription: string;
  couponEndDate: string;
  couponStatus: string;
  couponType: string;
}

export type ApplyCoupon = Pick<Coupon, 'couponId' | 'couponType'>;

export interface quizCoupon {
  couponType: string;
  couponDescription: string;
}

export interface isQuizCoupon {
  couponStatus: boolean;
}