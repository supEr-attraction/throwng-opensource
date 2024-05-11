import { axiosApi } from "@/utils/common";
import axios from "axios";
import { QuizContent } from "../../types/quizType";

const api = axiosApi();

const getQuizContent = async (): Promise<QuizContent[]> => {
  try {
    const response = await api.get<QuizContent[]>("/quizzes/contents");
    // console.log(response.data)
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("Axios error:", e.response?.data || e.message);
    } else {
      console.error("Unexpected error:", e);
    }
    throw e;
  }
};

export { getQuizContent }