import { axiosApi } from "@/utils/common";

const api = axiosApi()

const getSearchMusic = async(data:string) => {
  try {
    const res = await api.get(`/music/search/${data}`)
    console.log(res.data)
    return res
  } catch (e) {
    console.log(e)
  }
}

export {getSearchMusic}