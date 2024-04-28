import { axiosApi } from "@/utils/common";
import { ResponseData } from "../../types/songType";

const api = axiosApi()

const getMyPlayList = async (lastModifiedAt: string|null):Promise<ResponseData> => {
  try {
    const res = await api.get<ResponseData>(`/playlists?time=${lastModifiedAt}`)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const deleteMyPlayList = async(data:number) => {
  try {
    const res = await api.delete(`/playlists/${data}`)
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }
}

export {
  getMyPlayList,
  deleteMyPlayList,
}
