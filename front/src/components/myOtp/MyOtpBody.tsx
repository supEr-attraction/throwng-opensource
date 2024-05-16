import MusicDropBtn from "@components/musicDrop/MusicDropBtn";
import { getMyOtp } from "@services/myOtpApi/MyOtpApi";
import "@styles/myOtp/MyOtpBody.scss"
import { useState, useEffect } from "react";
import ToasterMsg from "@components/ToasterMsg";
import { toastMsg } from "@/utils/toastMsg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOtpBody = () => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate()

  const fetchMyOtp = async () => {
    try {
      const res = await getMyOtp();
      SSEConnection();
      setOtp(res.data);
      setTimeLeft(60);
  
      setTimeout(() => {
        setOtp('');
        setTimeLeft(0);
      }, 60000);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 429) {
          toastMsg('너무 많은 요청을 보냈습니다. 잠시 후에 다시 시도해주세요.');
        }
      }
    }
  }

  const SSEConnection = () => {
    const sse = new EventSource(`${BASE_URL}/api/users/connect`);

    sse.addEventListener('WatchAuthentication', (e) => {
      if (e.data === 'success') {
        sse.close();
        alert('연동이 완료되었어요. 마이쓰롱으로 이동할게요.');
        navigate('/user/mypage', { replace: true });
      }
    });

    sse.onerror = () => {
      sse.close();
    };

    return sse;
  };
  
  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  return (
    <div className="MyOtpBody">
      <div className="otp-title">
        {otp ? 
        <div className="otp-number">{otp}</div>
        : <div className="otp-no-result">발급된 번호가 없습니다</div>
        }
        <div className="otp-desc">
          <div>60초 내에 발급된 번호를</div>
          <div>워치 화면에 입력해주세요</div>
          {otp !== ''&& <div>유효시간 : {timeLeft}초</div>}
        </div>
      </div>
      <MusicDropBtn onClick={fetchMyOtp} btnText="발급받기" />
      <ToasterMsg/>
    </div>
  )
}

export default MyOtpBody;
