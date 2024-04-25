import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "@styles/Header.scss";

interface Props {
  centerText?: string;
}

const Header = ({ centerText }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackNavigation = () => {
    if (location.pathname === '/music/search') {
      if (localStorage.getItem('searchKeyWord')) {
        localStorage.removeItem('searchKeyWord')
      }
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
