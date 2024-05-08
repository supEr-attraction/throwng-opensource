import { axiosApi } from "@/utils/common";
import { Coupon } from "../../types/couponType";

const api = axiosApi();

const postMyCoupon = async (couponId:number) => {
  try {
    const { data } = await api.post(`/users/user/coupon/${couponId}`);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getMyCoupon = async ():Promise<Coupon[]> => {
  try {
    const { data } = await api.get<Coupon[]>(`/users/user/coupon`);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const putNickName = async (nickName:string):Promise<string> => {
  try {
    const { data } = await api.put(`/users/user/nickname`, nickName);
    return data;
  } catch (e) {
    console.log(e);
    throw(e);
  }
}

export {
  postMyCoupon,
  getMyCoupon,
  putNickName
}