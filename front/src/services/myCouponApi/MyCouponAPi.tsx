import { axiosApi } from "@/utils/common";
import { ApplyCoupon, Coupon } from "../../types/couponType";
import { changeNickNameCoupon } from "../../types/myPage";

const api = axiosApi();

const postMyCoupon = async (requestBody:ApplyCoupon) => {
  try {
    const { data } = await api.post(`/users/user/coupon`, requestBody);
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

const putNickName = async (requestBody:changeNickNameCoupon):Promise<changeNickNameCoupon> => {
  try {
    const { data } = await api.put(`/users/user/nickname`, requestBody);
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