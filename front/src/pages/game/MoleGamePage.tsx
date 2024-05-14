import Header from "@components/Header";
import MoleGame from "@components/game/MoleGame";
import "@/styles/game/MoleGamePage.scss";

const MoleGamePage = () => {
  return (
    <div className="MoleGamePage">
      <Header />
      <div className="mole-header">
        <div className="mole-game">
          <MoleGame />
        </div>
      </div>
    </div>
  );
};

export default MoleGamePage;
