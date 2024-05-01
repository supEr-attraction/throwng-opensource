import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "@styles/Header.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { inputSearchKeyWord } from "@store/musicSearch/atoms";
import ping from "@assets/images/ping.webp";
import { FiLogOut } from "react-icons/fi";
import { logoutModalState } from "@store/auth/atom";

interface Props {
  centerText?: string;
  type?: string;
}

const Header = ({ centerText, type }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchKeyWord, setSearchKeyWord] = useRecoilState(inputSearchKeyWord);
  const setLogoutModal = useSetRecoilState(logoutModalState);

  const handleBackNavigation = () => {
    if (location.pathname.startsWith("/music/search")) {
      if (searchKeyWord !== "") {
        setSearchKeyWord("");
      }
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  const handleOpenModal = () => {
    document.body.style.overflow = "hidden";
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
