import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "@styles/Header.scss";
import { useRecoilState } from "recoil";
import { inputSearchKeyWord } from "@store/musicSearch/atoms";

interface Props {
  centerText?: string;
  func?: () => void;
}

const Header = ({ centerText, func }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchKeyWord, setSearchKeyWord] = useRecoilState(inputSearchKeyWord);

  const handleBackNavigation = () => {
    if (location.pathname === "/music/search") {
      if (searchKeyWord !== "") {
        setSearchKeyWord("");
      }
    }

    if (func) {
      func();
    }

    navigate(-1);
  };

  return (
    <header className="Header">
      <IoIosArrowBack onClick={handleBackNavigation} />
      <div className="center">{centerText}</div>
      <div className="blank" />
    </header>
  );
};

export default Header;
