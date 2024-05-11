import { axiosApi } from "@/utils/common";
import { QuizData, QuizResult } from "../../types/quizType";
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

const postQuizSolve = async (quizResult: QuizResult) => {
  try {
    const response = await api.post("/quizzes/result", quizResult);
    return response;
  } catch (e) {
    console.log(e)
    if (axios.isAxiosError(e)) {
      console.error(
        "Failed to post quiz result:",
        e.response?.data || e.message
      );
    } else {
      console.error("Error posting quiz result:", e);
    }
    throw e;
  }
};

export { postQuizSolve, getQuizSolve };
