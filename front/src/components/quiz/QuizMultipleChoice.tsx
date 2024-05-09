import { useEffect, useRef, useState } from "react";
import "@styles/quiz/QuizMultipleChoice.scss";
import { ImVolumeMedium, ImVolumeMute2 } from "react-icons/im";

interface Choice {
  id: string;
  text: string;
}

interface QuizMultipleChoiceProps {
  setCanSubmit: (canSubmit: boolean) => void;
  question: string;
  choices: Choice[];
  index: number;
  previewUrl?: string;
  onUserInput: (input: string) => void; // 사용자 입력을 상위 컴포넌트로 전달하는 콜백
}

const QuizMultipleChoice = ({
  onUserInput,
  setCanSubmit,
  question,
  choices,
  index,
  previewUrl,
}: QuizMultipleChoiceProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [isMuted]);

  useEffect(() => {
    setSelectedChoice(null);
  }, [question]);

  const handleChoiceClick = (id: string) => {
    setSelectedChoice(id);
    onUserInput(id);
    setCanSubmit(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="QuizMultipleChoice">
      <div className="quiz-header">
        <h2>Q{index + 1}.</h2>
        {previewUrl && (
          <div className="quiz-audio" onClick={toggleMute}>
            {isMuted ? <ImVolumeMute2 /> : <ImVolumeMedium />}
            <audio ref={audioRef} muted={isMuted} src={previewUrl}></audio>
          </div>
        )}
      </div>
      <div className="mc-question">
        <p>{question}</p>
      </div>
      <div className="mc-choice">
        {choices.length > 0 ? (
          choices.map((choice) => (
            <div
              key={choice.id}
              className={`choice ${
                selectedChoice === choice.id ? "selected" : ""
              }`}
              onClick={() => handleChoiceClick(choice.id)}
            >
              {choice.text}
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default QuizMultipleChoice;
