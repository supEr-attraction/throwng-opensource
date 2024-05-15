import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { LuHome } from "react-icons/lu";
import { FaRegCirclePlay } from "react-icons/fa6";
import circle from "@assets/images/Cone.webp";
import logo from "@assets/images/logo.webp";
import "@styles/Navbar.scss";
import { IoGameControllerOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="Navbar">
      <nav className="menu">
        <NavLink to={"/"} className="menu__item">
          <LuHome />
          <div>홈</div>
        </NavLink>
        <NavLink to={"/user/playlist"} className="menu__item">
          <FaRegCirclePlay />
          <div>플레이리스트</div>
        </NavLink>
        <div className="menu__item disable">
          <NavLink to={"/music/search"} className="center">
            <img
              className="circle"
              src={circle}
              loading="lazy"
              decoding="async"
            />
            <img className="logo" src={logo} loading="lazy" decoding="async" />
          </NavLink>
        </div>
        <NavLink to={"/content"} className="menu__item">
          <IoGameControllerOutline />
          <div>컨텐츠</div>
        </NavLink>
        <NavLink to={"/user/mypage"} className="menu__item">
          <FaRegUser />
          <div>마이</div>
        </NavLink>

        <div className="menu__border"></div>
      </nav>
      <div className="svg-container">
        <svg viewBox="0 0 202.9 45.5">
          <clipPath
            id="menu"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.0049285362247413 0.021978021978022)"
          >
            <path
              d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
          c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
          c9.2,3.6,17.6,4.2,23.3,4H6.7z"
            />
          </clipPath>
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
