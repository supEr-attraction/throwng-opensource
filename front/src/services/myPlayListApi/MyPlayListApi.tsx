import { axiosApi } from "@/utils/common";
import { ResponseData } from "../../types/songType";

const api = axiosApi()

const getMyPlayList = async (lastModifiedAt: string|null):Promise<ResponseData> => {
  try {
    const {data} = await api.get<ResponseData>(`/music/playlists?time=${lastModifiedAt}`)
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const deleteMyPlayList = async(idx:number) => {
  try {
    const {data} = await api.delete(`/music/playlists/${idx}`)
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
  }
}

export {
  getMyPlayList,
  deleteMyPlayList,
}
