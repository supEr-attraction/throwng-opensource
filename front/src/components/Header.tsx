import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { logoutModalState } from "@store/auth/atom";
import { IoIosArrowBack } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import AddressContent from "./map/AddressContent";
import "@styles/Header.scss";

interface Props {
  centerText?: string;
  type?: "address" | "logout";
}

const Header = ({ centerText = "", type }: Props) => {
  const navigate = useNavigate();
  const setLogoutModal = useSetRecoilState(logoutModalState);
  const { pathname } = useLocation();

  const handleBackNavigation = () => {
    if (
      ["/user/mypage", "/user/playlist", "/content", "/music/search"].includes(
        pathname
      )
    ) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  const handleOpenModal = () => {
    setLogoutModal(true);
  };

  return (
    <header className="Header">
      <IoIosArrowBack onClick={handleBackNavigation} />
      {type === "address" ? (
        <AddressContent address={centerText} />
      ) : (
        <div className="center">{centerText}</div>
      )}
      {type === "logout" ? (
        <FiLogOut className="logout" onClick={handleOpenModal} />
      ) : (
        <div className="blank" />
      )}
    </header>
  );
};

export default memo(Header);
