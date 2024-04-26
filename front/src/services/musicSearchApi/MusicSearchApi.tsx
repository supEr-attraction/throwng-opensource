// import { axiosApi } from "@/utils/common";

import axios from "axios"

// const api = axiosApi()

const getSearchMusic = async(data:string) => {
  try {
    const res = await axios.get(`http://throwng.store:8084/music/search/${data}`)
    console.log(res.data)
    return res
  } catch (e) {
    console.log(e)
  }
}

export {getSearchMusic}