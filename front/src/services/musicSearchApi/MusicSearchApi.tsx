import { axiosApi, axiosFileApi } from "@/utils/common";
import { DropSong, Song } from "../../types/songType";
import axios from "axios";

const api = axiosApi();
const apiFile = axiosFileApi();

const getSearchMusic = async (title: string): Promise<Song[]> => {
  try {
    const { data } = await api.get<Song[]>(`/music/search?keyword=${title}`);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const postImageUpload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("imageUrl", file);
    const { data } = await apiFile.post(`/music/upload-image`, formData);
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const postThrowngMusic = async (youtubeId: string, requestBody: DropSong) => {
  try {
    const { data } = await api.post(
      `/music/thrown-song/${youtubeId}`,
      requestBody
    );
    return data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      const { code } = e.response.data;
      return code;
    }
  }
};

export { getSearchMusic, postThrowngMusic, postImageUpload };
