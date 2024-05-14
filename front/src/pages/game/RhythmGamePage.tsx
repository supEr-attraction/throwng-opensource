import Header from "@components/Header";
import "@/styles/game/MoleGamePage.scss";
import RhythmGame from "@components/game/RhythmGame";


const RhythmGamePage = () => {
  return (
    <div className="MoleGamePage">
      <Header />
      <div className="mole-header">
        <div className="mole-game">
          <RhythmGame />
        </div>
      </div>
    </div>
  );
};

export default RhythmGamePage;
