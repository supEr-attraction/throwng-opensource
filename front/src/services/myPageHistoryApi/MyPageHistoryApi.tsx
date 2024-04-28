import { axiosApi } from "@/utils/common";
import { MyPickHistory, MyThrowHistory } from "../../types/songType";
import { MyLevel } from "../../types/myPage";

const api = axiosApi()

const getMyDropHistory = async():Promise<MyThrowHistory[]> => {
  try {
    const res = await api.get<MyThrowHistory[]>(`/users/user/thrown-music`)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getMyPickHistory = async():Promise<MyPickHistory[]> => {
  try {
    const res = await api.get<MyPickHistory[]>(`/users/user/picked-music`)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getMyLevel = async():Promise<MyLevel> => {
  try {
    const res = await api.get<MyLevel>(`/users/user/profile`)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export {
  getMyDropHistory, 
  getMyPickHistory,
  getMyLevel,
}