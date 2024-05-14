import moleImg from "@/assets/images/Hammer.webp";
import "@/styles/game/MoleGame.scss";

type MoleProps = {
  show: boolean;
};

const Mole = ({ show }: MoleProps) => {
  return (
    <img
      src={moleImg}
      alt="mole"
      className={`mole ${show ? "show" : "hidden"}`}
    />
  );
};

export default Mole;
