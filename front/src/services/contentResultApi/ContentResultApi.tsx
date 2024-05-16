import { axiosApi } from "@/utils/common";
import axios from "axios";

const api = axiosApi();

export const postContentResult = async (route: "rhythm" | "memory") => {
  try {
    
    const response = await api.post("/quizzes/contents/result", {
      route,
    });
    console.log(response)
    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("퀴즈 결과 전송 실패:", e.response?.data || e.message);
    } else {
      console.error("퀴즈 결과 전송 중 오류 발생:", e);
    }
    throw e;
  }
};
