import { FaRegBell } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";
import "@styles/myPage/MyPageMenu.scss"

const MyPageMenu = () => {
  return (
    <div className="MyPageMenu">
      <div className="menu-body">
        <div className="menu-item">
          <FaRegBell />
          <div className="desc">알림</div>
        </div>
        <div className="menu-item">
          <RiCoupon2Line />
          <div className="desc">쿠폰함</div>
        </div>
        <div className="menu-item">
          <LuUser2 />
          <div className="desc">활동</div>
        </div>
      </div>
    </div>
  )
}

export default MyPageMenu