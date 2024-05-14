import { axiosApi } from "@/utils/common";

const api = axiosApi();

const getMyOtp = async () => {
  try {
    const { data } = await api.get<string>(`/users/watch/otp`);
    return { data };
  } catch (e) {
    throw e;
  }
};


export { getMyOtp };
