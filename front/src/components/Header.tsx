import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "@styles/Header.scss";

interface Props {
  centerText?: string;
}

const Header = ({ centerText }: Props) => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
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
