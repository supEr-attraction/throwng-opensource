import { FaRegBell } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { MdOutlineWatch } from "react-icons/md";
import "@styles/myPage/MyPageMenu.scss"
import { useNavigate } from "react-router-dom";

const MyPageMenu = () => {
  const navigate = useNavigate()

  const goNoticePage = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigate('/user/notification')
  }

  const goCouponPage = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigate('/user/mycoupons')
  }

  const goGetOtpPage = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigate('/user/myotp')
  }

  return (
    <div className="MyPageMenu">
      <div className="menu-body">
        <div className="menu-item" onClick={(e) => goNoticePage(e)}>
          <FaRegBell />
          <div className="desc">알림</div>
        </div>
        <div className="menu-item" onClick={(e) => goCouponPage(e)}>
          <RiCoupon2Line />
          <div className="desc">쿠폰함</div>
        </div>
        <div className="menu-item" onClick={(e) => goGetOtpPage(e)}>
          <MdOutlineWatch />
          <div className="desc">연동하기</div>
        </div>
      </div>
    </div>
  )
}

export default MyPageMenu