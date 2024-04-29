import { useEffect, useState } from "react"
import "@styles/notification/NotificationBody.scss"
import { NoticeType } from "../../types/noticeType"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale('ko');

const NotificationBody = () => {
  const navigate = useNavigate()
  const [noticeList, setNoticeList] = useState<NoticeType[]>([])
  
  useEffect(() => {
    // api 요청
    const data = [
      {
        quizId:1,
        date:"2024-04-29T13:24:23",
      },
      {
        quizId:2,
        date:"2024-04-28T12:05:23",
      },
    ]
    setNoticeList(data)
  })

  const formatDistanceToNow = (dateString:string) => {
    return dayjs(dateString).fromNow();
  };

  const goQuiz = (index:number) => {
    navigate(`/quiz/${index}`, {replace:true})
  }

  return (
    <div className="NotificationBody">
      {noticeList.map ((notice, index) => (
        <div className="body" key={index} onClick={() => goQuiz(notice.quizId)}>
          <div className="header">
            <div className="category">퀴즈/이벤트</div>
            <div className="date">{formatDistanceToNow(notice.date)}</div>
          </div>
          <div className="title">매일 30분만 열리는 깜짝 퀴즈 타임!</div>
          <div className="sub-title">문제를 다 맞추면 특별한 랜덤박스를 지급해 드려요 (선착순)</div>
        </div>
      ))}
    </div>
  )
}

export default NotificationBody