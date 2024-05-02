import { axiosApi } from "@/utils/common";

interface UserToken {
  accessToken: string;
}

async function getCode(provider: string, code: string): Promise<UserToken> {
  try {
    const { data } = await axiosApi().get<UserToken>(
      `/users/auth/login/${provider}?code=${code}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function logout() {
  try {
    await axiosApi().delete(`/users/user/logout`);
  } catch (error) {
    console.error(error);
  }
}

export { getCode, logout };
