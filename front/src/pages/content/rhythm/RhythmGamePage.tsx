import Header from "@components/Header";
import "@/styles/content/rhythm/RhythmGamePage.scss";
import RhythmGame from "@components/content/rhythm/RhythmGame";


const RhythmGamePage = () => {
  return (
    <div className="RhythmGamePage">
      <Header />
      <div className="rhythm-header">
        <div className="rhythm-game">
          <RhythmGame />
        </div>
      </div>
    </div>
  );
};

export default RhythmGamePage;
