import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "@styles/Header.scss";
import { useRecoilState } from "recoil";
import { inputSearchKeyWord } from "@store/musicSearch/atoms";
import ping from "@assets/images/ping.webp";

interface Props {
  centerText?: string;
  type?: string;
}

const Header = ({ centerText, type }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchKeyWord, setSearchKeyWord] = useRecoilState(inputSearchKeyWord);

  const handleBackNavigation = () => {
    if (location.pathname === "/music/search") {
      if (searchKeyWord !== "") {
        setSearchKeyWord("");
      }
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="Header">
      <IoIosArrowBack onClick={handleBackNavigation} />
      <div className="center">
        {type === "address" && <img src={ping} />}
        <div>{centerText}</div>
      </div>
      <div className="blank" />
    </header>
  );
};

export default Header;
