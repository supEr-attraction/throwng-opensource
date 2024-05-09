import { axiosApi } from "@/utils/common";

const api = axiosApi();

const getMyOtp = async (): Promise<string> => {
  try {
    const { data } = await api.get<string>(`/users/watch/otp`);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { getMyOtp };
