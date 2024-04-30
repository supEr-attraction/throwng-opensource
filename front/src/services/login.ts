import { axiosApi } from "@/utils/common";

interface UserToken {
  accessToken: string;
}

async function getCode(provider: string, code: string): Promise<UserToken> {
  try {
    const { data } = await axiosApi().get<UserToken>(
      `/users/auth/login/${provider}?code=${code}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function logout() {
  try {
    const res = await axiosApi().delete(`/users/user/logout`);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

export { getCode, logout };
