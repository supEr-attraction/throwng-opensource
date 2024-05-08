import { axiosApi } from "@/utils/common";
import "@types/quizType";
import { QuizData } from "../../types/quizType";
import axios from "axios";

const api = axiosApi();

const getQuizSolve = async (): Promise<QuizData[]> => {
  try {
    const response = await api.get<QuizData[]>("/quizzes/list");
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

export default getQuizSolve;

const postQuizSolve = async (result: boolean) => {
  try {
    const response = await api.post("quizzes/result", { result });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export { postQuizSolve };
