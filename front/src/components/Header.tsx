import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSetRecoilState } from "recoil";
import { FiLogOut } from "react-icons/fi";
import { logoutModalState } from "@store/auth/atom";
import ping from "@assets/images/ping.webp";
import "@styles/Header.scss";

interface Props {
  centerText?: string;
  type?: string;
}

const Header = ({ centerText, type }: Props) => {
  const navigate = useNavigate();
  const setLogoutModal = useSetRecoilState(logoutModalState);

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleOpenModal = () => {
    // document.body.style.overflow = "hidden";
    setLogoutModal(true);
  };

  return (
    <header className="Header">
      <IoIosArrowBack onClick={handleBackNavigation} />
      <div className="center">
        {type === "address" && <img src={ping} />}
        <div>{centerText}</div>
      </div>
      {type === "logout" ? (
        <FiLogOut className="logout" onClick={handleOpenModal} />
      ) : (
        <div className="blank" />
      )}
    </header>
  );
};

export default Header;
