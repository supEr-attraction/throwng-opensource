import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/game/RhythmGame.scss";
import { fetchSongPreviewUrls } from "@services/rhythmApi/RhythmApi";
import Loading from "@components/Loading";

const RhythmGame = () => {
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [comboVisible, setComboVisible] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(120);
  const [notes, setNotes] = useState<
    Array<{ id: number; top: number; lane: number; exploding?: boolean }>
  >([]);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); 
  const [laneEffect, setLaneEffect] = useState<number | null>(null);
  const noteIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  useEffect(() => {
    const loadAudioUrls = async () => {
      const urls = await fetchSongPreviewUrls();
      if (urls && urls.length > 0) {
        setAudioUrls(urls);
        audioRefs.current = new Array(urls.length).fill(null);
      }
    };
    loadAudioUrls();
  }, []);

  useEffect(() => {
    if (audioUrls.length > 0) {
      audioRefs.current = audioRefs.current.slice(0, audioUrls.length);
    }
  }, [audioUrls]);

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
      setLoading(true); 
      if (noteIntervalRef.current) clearInterval(noteIntervalRef.current);
      setTimeout(() => {
        navigate("/rhythm/result", { state: { score }, replace: true });
        resetGame();
      }, 1000);
    }
  }, [timer, navigate, score]);

  const resetGame = () => {
    setScore(0);
    setCombo(0);
    setTimer(120);
    setNotes([]);
    setLoading(false); 
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const startGame = () => {
    resetGame();
    setGameActive(true);
    if (audioRefs.current[0]) {
      audioRefs.current[0].play();
    }
  };

  const handleAudioEnded = (index: number) => {
    if (index < audioRefs.current.length - 1 && audioRefs.current[index + 1]) {
      //@ts-ignore
      audioRefs.current[index + 1].play();
    }
  };

  const handleTouchOrClick = (lane: number) => {
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
      {loading && (
        <div className="loadingSpinner">
          <Loading />
        </div>
      )}{" "}
      {audioUrls.map((url, index) => (
        <audio
          key={index}
          ref={(el) => {
            audioRefs.current[index] = el;
          }}
          src={url}
          onEnded={() => handleAudioEnded(index)}
        />
      ))}
      <div className="gameHeader">
        <div className="gameStart">
          <button onClick={startGame} disabled={gameActive}>
            Start
          </button>
        </div>
        <div className="gameScoreTime">
          <p>Score: {score}</p>
        </div>
      </div>
      <div className="gameBoard">
        {lanes.map((_, index) => (
          <div
            key={index}
            className={`lane lane${index} ${
              laneEffect === index ? "lightingEffect" : ""
            }`}
            onTouchStart={() => handleTouchOrClick(index)}
            onMouseDown={() => handleTouchOrClick(index)}
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
