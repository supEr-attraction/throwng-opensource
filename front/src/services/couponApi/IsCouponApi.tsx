import axios from "axios";
import { axiosApi } from "@/utils/common";
import { isQuizCoupon } from "../../types/couponType";

const api = axiosApi();

const getIsCoupon = async (route: string): Promise<isQuizCoupon> => {
  try {
    const response = await api.get<isQuizCoupon>(
      `/quizzes/coupons/valid/${route}`
    );
    // console.log("API response received:", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    if (axios.isAxiosError(e)) {
      console.error(
        "Axios error:",
        e.response?.status,
        e.response?.data || e.message
      );
    } else {
      console.error("Unexpected error:", e);
    }
    throw e;
  }
};

export { getIsCoupon };
