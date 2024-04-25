import { useEffect, useState } from "react"
import {SongHistory} from "../../types/songType.ts" 
import "@styles/myPage/MyThrowngHistroyList.scss"
import { TiLocation } from "react-icons/ti";

interface Props {
  pageIdx:boolean,
  setHistoryCnt:React.Dispatch<React.SetStateAction<number>>,
  period:string
}

const MyThrowngHistroyList = ({pageIdx,setHistoryCnt}:Props) => {
  const [songHistoryList, setSongHistoryList] = useState<SongHistory[]>([])

  useEffect(() => {
    // api 호출

    // if (!pageIdx) {
    //   setSongHistoryList(result)
    //   setHistoryCnt(result.length)
    // } else {
    //   setSongHistoryList(result)
    //   setHistoryCnt(result.length)
    // }
  }, [pageIdx])

  const handleGoNavigation = (song:SongHistory) => {
    console.log(song)
  }

  return (
    <div className="MyThrowngHistroyList">
      <div className="list-body">
        {songHistoryList.length > 0 ? (
          songHistoryList.map((song, index) => (
            <div key={index} className="result-item" onClick={() => handleGoNavigation(song)}>
              
              <div className="item-header">
                <div className="item-date">{song.date}</div>
                <div className="item-location"><TiLocation /> {song.location}</div>
              </div>
  
              <div className="item">
                <div className="img-container">
                  <img src={song.albumImage}/>
                </div>
                <div className="item-detail">
                  <div className="item-title">{song.title}</div>
                  <div className="item-artist">{song.artist}</div>
                  <div className="item-comment">{song.comment}</div>
                </div>
              </div>
  
            </div>
          ))
        ) : (
          <div className="no-result">내역이 없습니다.</div>
        )}
      </div>
    </div>
  )  
}

export default MyThrowngHistroyList