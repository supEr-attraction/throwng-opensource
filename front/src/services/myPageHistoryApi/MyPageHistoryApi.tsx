import { axiosApi } from "@/utils/common";

const api = axiosApi()

const getMyDropHistory = async() => {
  try {
    const res = await api.get(`/users/user/thrown-music`)
    console.log(res.data)
    return res
  } catch (e) {
    console.log(e)
  }
}

const getMyPickHistory = async() => {
  try {
    const res = await api.get(`/users/user/picked-music`)
    console.log(res.data)
    return res
  } catch (e) {
    console.log(e)
  }
}

export {
  getMyDropHistory, 
  getMyPickHistory,
}