import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/game/RhythmGame.scss";

const RhythmGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [comboVisible, setComboVisible] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(120);
  const [notes, setNotes] = useState<
    Array<{ id: number; top: number; lane: number; exploding?: boolean }>
  >([]);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [laneEffect, setLaneEffect] = useState<number | null>(null);
  const noteIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const lanes = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    if (gameActive) {
      gameTimerRef.current = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      noteIntervalRef.current = setInterval(() => {
        const newNotes = Array.from({ length: 1 }, () => ({
          id: Date.now() + Math.random(),
          top: 0,
          lane: lanes[Math.floor(Math.random() * lanes.length)],
        }));
        setNotes((prevNotes) => [...prevNotes, ...newNotes]);
      }, 500);
    }

    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (noteIntervalRef.current) clearInterval(noteIntervalRef.current);
    };
  }, [gameActive]);

  useEffect(() => {
    if (timer === 0) {
      setGameActive(false);
      if (noteIntervalRef.current) clearInterval(noteIntervalRef.current);
      setTimeout(() => {
        navigate("/rhythm/result", { state: { score } });
        resetGame();
      }, 1000);
    }
  }, [timer, navigate, score]);

  const resetGame = () => {
    setScore(0);
    setCombo(0);
    setTimer(120);
    setNotes([]);
  };

  const startGame = () => {
    resetGame();
    setGameActive(true);
  };

  const handleTouch = (lane: number) => {
    setLaneEffect(lane);
    setTimeout(() => setLaneEffect(null), 300);

    const closestNoteIndex = notes.findIndex(
      (note) => note.lane === lane && Math.abs(note.top - 90) < 10
    );
    if (closestNoteIndex !== -1) {
      const closestNote = notes[closestNoteIndex];
      setScore((prevScore) => prevScore + 10);
      setCombo((prevCombo) => prevCombo + 1);
      showCombo();

      setNotes((prevNotes) => {
        const newNotes = [...prevNotes];
        newNotes[closestNoteIndex] = { ...closestNote, exploding: true };
        return newNotes;
      });

      setTimeout(() => {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== closestNote.id)
        );
      }, 200);
    } else {
      setCombo(0);
    }
  };

  const showCombo = () => {
    setComboVisible(true);
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    comboTimeoutRef.current = setTimeout(() => {
      setComboVisible(false);
    }, 1000);
  };

  useEffect(() => {
    if (gameActive) {
      const intervalId = setInterval(updateNotes, 100);
      return () => clearInterval(intervalId);
    }
  }, [gameActive]);

  const updateNotes = () => {
    setNotes((prevNotes) =>
      prevNotes
        .map((note) => ({
          ...note,
          top: note.top + 5,
        }))
        .filter((note) => note.top < 100 || note.exploding)
    );
  };

  return (
    <div className="RhythmGame">
      <div className="gameHeader">
        <div className="gameStart">
          <button onClick={startGame} disabled={gameActive}>
            Start
          </button>
        </div>
        <div className="gameScoreTime">
          <p>Score: {score}</p>
          {/* <p>Timer: {timer}</p> */}
        </div>
      </div>
      <div className="gameBoard">
        {lanes.map((_, index) => (
          <div
            key={index}
            className={`lane lane${index} ${
              laneEffect === index ? "lightingEffect" : ""
            }`}
            onTouchStart={() => handleTouch(index)}
          >
            <div className="hitArea secondary" />
            <div className="hitArea primary" />
          </div>
        ))}
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note lane${note.lane} ${
              note.exploding ? "exploding" : ""
            }`}
            style={{ top: `${note.top}%`, left: `${note.lane * 16.66}%` }}
          />
        ))}
      </div>

      {comboVisible && (
        <div className="comboDisplay">
          Combo <br /> {combo}
        </div>
      )}
    </div>
  );
};

export default RhythmGame;
