import { axiosApi } from "@/utils/common";
import { MyHistory } from "../../types/songType";
import { MyLevel } from "../../types/myPage";
import { NoticeType } from "../../types/noticeType";

const api = axiosApi();

const getMyDropHistory = async (): Promise<MyHistory[]> => {
  try {
    const { data } = await api.get<MyHistory[]>(`/users/user/thrown-song`);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getMyPickHistory = async (): Promise<MyHistory[]> => {
  try {
    const { data } = await api.get<MyHistory[]>(`/users/user/picked-song`);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getMyLevel = async (): Promise<MyLevel> => {
  try {
    const { data } = await api.get<MyLevel>(`/users/user/profile`);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getMyNotice = async (): Promise<NoticeType[]> => {
  try {
    const { data } = await api.get<NoticeType[]>(`/users/user/notification`);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { getMyDropHistory, getMyPickHistory, getMyLevel, getMyNotice, };
