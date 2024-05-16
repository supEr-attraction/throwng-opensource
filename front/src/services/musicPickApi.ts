import { axiosApi } from "@/utils/common";
import { MusicInfo } from "../types/mapType";

const getMusicDetails = async (throwId: string): Promise<MusicInfo> => {
  try {
    const { data } = await axiosApi().get<MusicInfo>(
      `/music/thrown/${throwId}`
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const postMusicPick = async (throwId: number) => {
  try {
    await axiosApi().post(`/music/pick/${throwId}`);
  } catch (error) {
    throw error;
  }
};

export { getMusicDetails, postMusicPick };
