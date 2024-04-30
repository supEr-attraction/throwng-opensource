import { axiosApi, axiosFileApi } from "@/utils/common";
import { DropSong, Song } from "../../types/songType"

const api = axiosApi()
const apiFile = axiosFileApi()

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

const postThrowngMusic = async (youtubeId:string, requestBody:DropSong, imageUrl:File|null) => {
  try {
    const formData = new FormData();

    if (imageUrl) {
      formData.append("imageUrl", imageUrl)
    }
    formData.append("thrownItemRequest", new Blob([JSON.stringify(requestBody)], {type:'application/json'}));

    const { data } = await apiFile.post(
      `/music/thrown-song/${youtubeId}`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    );

    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export {
  getSearchMusic,
  postThrowngMusic,
}