import { axiosApi, axiosFileApi } from "@/utils/common";
import { DropSong, Song } from "../../types/songType"

const api = axiosApi()
const apiFile = axiosFileApi();

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

// const postThrowngMusic = async(youtubeId:string, params:DropSong)=> {
//   try {
//     const {data} = await api.post(`/music/thrown-song/${youtubeId}`, params);
//     console.log(data)
//     return data
//   } catch (e) {
//     console.log(e);
//     throw e;
//   }
// }

const postThrowngMusic = async (youtubeId:string, requestBody:DropSong) => {
  try {
    const formData = new FormData();
    const thrownItemRequest = JSON.stringify({
      longitude: requestBody.longitude,
      latitude: requestBody.latitude,
      location: requestBody.location,
      comment: requestBody.comment,
      title: requestBody.title,
      artist: requestBody.artist,
      albumImageUrl:requestBody.albumImageUrl
    });

    formData.append("thrownItemRequest", thrownItemRequest);
    if (requestBody.imageUrl) {
      formData.append("imageUrl", requestBody.imageUrl);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    const { data } = await apiFile.post(`/music/thrown-song/${youtubeId}`, formData);
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