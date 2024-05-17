import axios from "axios";
import { axiosApi } from "@/utils/common";
import { quizCoupon } from "../../types/couponType";

const api = axiosApi();

const getContentCoupon = async (route: string): Promise<quizCoupon> => {
  try {
    const response = await api.get<quizCoupon>(`/quizzes/coupons/${route}`);
    // console.log(route)
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("이미 쿠폰을 뽑았습니다", e);
    }
    throw e;
  }
};

export { getContentCoupon };
