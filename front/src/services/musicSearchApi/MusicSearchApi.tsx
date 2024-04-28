import { axiosApi } from "@/utils/common";
import { DropSong, Song } from "../../types/songType"

const api = axiosApi()

const getSearchMusic = async(title:string):Promise<Song[]>=> {
  try {
    const {data} = await api.get<Song[]>(`/music/search/${title}`)
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const postThrowngMusic = async(youtubeId:string, params:DropSong)=> {
  try {
    console.log(youtubeId)
    console.log(params)
    const {data} = await api.post(`/music/thrown/${youtubeId}`, params);
    console.log(data)
    return data
  } catch (e) {
    console.log(e);
    throw e;
  }
}


export {
  getSearchMusic,
  postThrowngMusic,
}