import { useState, useEffect } from "react";
import Mole from "@/components/game/Mole";
import moleImg from "@/assets/images/Hammer.webp";
import "@/styles/game/MoleGame.scss";

type MoleArray = boolean[];

const MoleGame = () => {
  const [moles, setMoles] = useState<MoleArray>(
    Array.from({ length: 25 }, () => false)
  );
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState<number>(30);

  const moleClickScore = () => {
    setScore(score + 1);
  };

  useEffect(() => {
    let moleInterval: NodeJS.Timeout;

    if (isGameRunning) {
      moleInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * moles.length);
        const newMoles = [...moles];
        newMoles[randomIndex] = true;
        setMoles(newMoles);

        setTimeout(() => {
          newMoles[randomIndex] = false;
          setMoles(newMoles);
        }, 500);

        setTime((prevTime) => {
          if (prevTime === 0) {
            alert(`짝짝짝! 점수는 ${score} 입니다.`);
            setIsGameRunning(false);
            setScore(0);
            return 30;
          }
          return prevTime - 1;
        });
      }, 500);
    }

    return () => {
      clearInterval(moleInterval);
    };
  }, [isGameRunning, moles, score]);

  const startGame = () => {
    setIsGameRunning(true);
  };

  // const stopGame = () => {
  //   setIsGameRunning(false);
  // };

  // const endGame = () => {
  //   setIsGameRunning(false);
  //   setMoles(Array.from({ length: 25 }, () => false));
  //   setScore(0);
  //   setTime(30);
  // };

  return (
    <div className="wrap">
      <div className="moleTit">
        <h1>
          두더지 게임
          <img src={moleImg} alt="logo" />
          <br />
        </h1>
        <div className="startEnd">
          <button onClick={startGame} type="button" disabled={isGameRunning}>
            Start
          </button>
          {/* <button onClick={stopGame} type="button" disabled={!isGameRunning}>
            Stop
          </button>
          <button onClick={endGame} type="button">
            End
          </button> */}
        </div>
        <div className="moleScoreTime">
          <p>Score : {score}</p>
          <p>Timer : {time}</p>
        </div>
      </div>
      <div className="moleList">
        <ol>
          {moles.map((show, index) => (
            <li key={index} onClick={() => show && moleClickScore()}>
              <Mole show={show} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MoleGame;
