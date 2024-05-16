import { axiosApi } from "@/utils/common";

const api = axiosApi();

const fetchSongPreviewUrls = async () => {
  try {
    const response = await api.get("/quizzes/contents/rhythm");
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch song preview URLs:", error);
    return null;
  }
};

export { fetchSongPreviewUrls };
