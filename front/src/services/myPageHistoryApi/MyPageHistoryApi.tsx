import { axiosApi } from "@/utils/common";
import { MyPickHistory, MyThrowHistory } from "../../types/songType";
import { MyLevel } from "../../types/myPage";

const api = axiosApi()

const getMyDropHistory = async():Promise<MyThrowHistory[]> => {
  try {
    const {data} = await api.get<MyThrowHistory[]>(`/users/user/thrown-song`)
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getMyPickHistory = async():Promise<MyPickHistory[]> => {
  try {
    const {data} = await api.get<MyPickHistory[]>(`/users/user/picked-song`)
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getMyLevel = async():Promise<MyLevel> => {
  try {
    const {data} = await api.get<MyLevel>(`/users/user/profile`)
    return data
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