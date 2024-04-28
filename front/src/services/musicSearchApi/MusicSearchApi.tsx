import { axiosApi } from "@/utils/common";
import { Song } from "../../types/songType"

const api = axiosApi()

const getSearchMusic = async(data:string):Promise<Song[]>=> {
  try {
    const res = await api.get<Song[]>(`/music/search/${data}`)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const postThrowngMusic = async(youtubeId:string, data: { longitude: number; latitude: number; location: string; imageUrl: string; comment: string; title: string; artist: string; albumImageUrl: string; }):Promise<Song[]>=> {
  try {
    const res = await api.post<Song[]>(`/music/thrown/${youtubeId}`, data);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}


export {
  getSearchMusic,
  postThrowngMusic,
}