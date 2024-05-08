import MusicDropBtn from "@components/musicDrop/MusicDropBtn";
import { getMyOtp } from "@services/myOtpApi/MyOtpApi";
import "@styles/myOtp/MyOtpBody.scss"
import { useState, useEffect } from "react";

const MyOtpBody = () => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const fetchMyOtp = async () => {
    const res = await getMyOtp();
    setOtp(res);
    setTimeLeft(60);

    setTimeout(() => {
      setOtp('');
      setTimeLeft(0);
    }, 60000);
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
    </div>
  )
}

export default MyOtpBody;
