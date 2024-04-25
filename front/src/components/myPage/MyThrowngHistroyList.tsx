import { useEffect, useState } from "react"
import {SongHistory} from "../../types/songType.ts" 
import "@styles/myPage/MyThrowngHistroyList.scss"
import { TiLocation } from "react-icons/ti";

import 피카1 from "@assets/images/피카1.png"
import 피카2 from "@assets/images/피카2.png"
import 피카3 from "@assets/images/피카3.png"

interface Props {
  pageIdx:boolean,
  setHistoryCnt:React.Dispatch<React.SetStateAction<number>>
}

const MyThrowngHistroyList = ({pageIdx,setHistoryCnt}:Props) => {
  const [songHistoryList, setSongHistoryList] = useState<SongHistory[]>([])

  useEffect(() => {
    // api 호출
    const dropResult = [
      { 
        id: 1, 
        image: 피카2,
        artist: "Baby, I'm just trying to play it cool But I just can't hide that I want you", 
        title: "Baby, I'm just trying to play it cool But I just can't hide that I want you", 
        comment: "Baby, I'm just trying to play it cool But I just can't hide that I want you", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 2, 
        image: 피카3,
        artist: "aespa", 
        title: "Spicy", 
        comment: "Wait a minute, 이게 뭐지? (뭐지?) 내 심장이 lub-dub, 자꾸만 뛰어 (뛰어) 저 멀리", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 3, 
        image: 피카1,
        artist: "aespa", 
        title: "Spicy", 
        comment: "네 모든 게 내 맘에 달라붙어버려, boy We're magnetized, 인정할게This time, I want", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 4, 
        image: 피카2,
        artist: "aespa", 
        title: "Spicy", 
        comment: "You, you, you, you, like it's magneticYou, you, you, you, you,", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 5, 
        image: 피카3,
        artist: "aespa", 
        title: "Spicy", 
        comment: "Bae, bae, bae, bae, bae, bae, bae, bae, baeDash-da-da,", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 6, 
        image: 피카1,
        artist: "aespa", 
        title: "Spicy", 
        comment: " you, you, you, super 이끌림You, you, you, you, ou, you, you, you, you, you, you, super 이끌림", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 7, 
        image: 피카2,
        artist: "aespa", 
        title: "Spicy", 
        comment: "서도, oh, (oh) my (my) gosh (gosh) 끌어당겨, you're my crush, 초능력처럼 거대한 자석이 된 것만 같아 my heart", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 8, 
        image: 피카3,
        artist: "aespa", 
        title: "Spicy", 
        comment: "정반대 같아 our type, 넌 J, 난 완전 PS와 N 극이지만, 그래서 끌리지", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 9, 
        image: 피카2,
        artist: "aespa", 
        title: "Spicy", 
        comment: "내가 만들래 green light, 여잔 배짱이지 So let's go, let's go, let's go, let's go", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 10, 
        image: 피카3,
        artist: "aespa", 
        title: "Spicy", 
        comment: "숨기고 싶지 않아 자석 같은 my heart       내 맘의 끌림대로 너를 향해 갈게, boy", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
    ]
    const pickResult = [
      { 
        id: 11, 
        image: 피카1,
        artist: "aespa", 
        title: "Spicy", 
        comment: "Wet", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 12, 
        image: 피카2,
        artist: "aespa", 
        title: "Spicy", 
        comment: "You, you, you, you, like it's magnetic", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 13, 
        image: 피카3,
        artist: "aespa", 
        title: "Spicy", 
        comment: "You, you, you, you, you, you, you, you, super 이끌림", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 14, 
        image: 피카1,
        artist: "aespa", 
        title: "Spicy", 
        comment: "You, you, you, you, like it's magnetic        You, you, you, you, you, you, you, you, su", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 15, 
        image: 피카2,
        artist: "aespa", 
        title: "Spicy", 
        comment: "You, you, you, you, you, you, you, you, super 이끌림", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 16, 
        image: 피카3,
        artist: "aespa", 
        title: "Spicy", 
        comment: "You, you, you, you, you, you, you, you, super 이끌림", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 17, 
        image: 피카1,
        artist: "aespa", 
        title: "Spicy", 
        comment: "Our chemistry, 난 과몰입해 지금 순간에 (baby, you're my crush, you're my crush)", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 18, 
        image: 피카2,
        artist: "aespa", 
        title: "Spicy", 
        comment: "No push and pull, 네게 집중 후회는 안 할래 (gonna dash, gonna dash)", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 19, 
        image: 피카3,
        artist: "aespa", 
        title: "Spicy", 
        comment: "Never holding back, 직진해, yeah (직진해, yeah), this time, I want        You, you, you, you, like it's magnetic", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 20, 
        image: 피카1,
        artist: "aespa", 
        title: "Spicy", 
        comment: "You, you, you, you, you, you, you, you, super 이끌림", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
      { 
        id: 21, 
        image: 피카1,
        artist: "ㅁㄴ어ㅏㄻㄴ어램ㄴ오랴ㅐㅕㅁㄴ", 
        title: "Spicy", 
        comment: "You, you, you, you, you, you, you, you, super 이끌림", 
        date:'24.04.24', 
        location:"광산구 동명동", 
      },
    ]

    if (!pageIdx) {
      setSongHistoryList(dropResult)
      setHistoryCnt(dropResult.length)
    } else {
      setSongHistoryList(pickResult)
      setHistoryCnt(pickResult.length)
    }
  }, [pageIdx])

  const handleGoNavigation = (song:SongHistory) => {
    console.log(song)
  }

  return (
    <div className="MyThrowngHistroyList">
      <div className="list-body">
        {songHistoryList.map((song) => (
          <div key={song.id} className="result-item" onClick={() => handleGoNavigation(song)}>
            
            <div className="item-header">
              <div className="item-date">{song.date}</div>
              <div className="item-location"><TiLocation /> {song.location}</div>
            </div>

            <div className="item">
              <div className="img-container">
                <img src={song.image}/>
              </div>
              <div className="item-detail">
                <div className="item-title">{song.title}</div>
                <div className="item-artist">{song.artist}</div>
                <div className="item-comment">{song.comment}</div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyThrowngHistroyList