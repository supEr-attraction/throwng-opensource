import { FaRegBell } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import "@styles/myPage/MyPageMenu.scss"
import { useNavigate } from "react-router-dom";

const MyPageMenu = () => {
  const navigate = useNavigate()

  const goNoticePage = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigate('/user/notification', {replace:true})
  }

  const goCouponPage = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigate('/user/mycoupons')
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
      </div>
    </div>
  )
}

export default MyPageMenu