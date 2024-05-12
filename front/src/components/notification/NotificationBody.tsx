import { useEffect, useState } from "react";
import "@styles/notification/NotificationBody.scss";
import { NoticeType } from "../../types/noticeType";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useNavigate } from "react-router-dom";
import { getMyNotice } from "@services/myPageHistoryApi/MyPageHistoryApi";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const NotificationBody = () => {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState<NoticeType[]>([]);

  useEffect(() => {
    fetchGetMyNotice();
    setNoticeList([]);
  }, []);

  const fetchGetMyNotice = async () => {
    const res = await getMyNotice();
    const updatedNotices = res.map(notice => {
      const url = new URL(notice.link);
      const path = url.pathname;
      return {
        ...notice,
        link: path,
      };
    });
    setNoticeList(updatedNotices);
  };

  const formatDistanceToNow = (dateString: string) => {
    return dayjs(dateString).fromNow();
  };

  const goQuiz = (link: string) => {
    navigate(link);
  };  

  return (
    <div className="NotificationBody">
      {noticeList.length > 0 ? (
        noticeList.map((notice, index) => (
          <div
            className="body"
            key={index}
            onClick={() => goQuiz(notice.link)}
          >
            <div className="header">
              <div className="category">{notice.category}</div>
              <div className="date">{formatDistanceToNow(notice.date)}</div>
            </div>
            <div className="title">{notice.title}</div>
            <div className="sub-title">
              {notice.body}
            </div>
          </div>
        ))
      ) : (
      <div className="SearchedWords">
        <div className="no-word-container">
          <div className="title">앗!</div>
          <div className="subtitle">알림 내역이 없습니다.</div>
        </div>
      </div>
      )}
    </div>
  );
};

export default NotificationBody;
