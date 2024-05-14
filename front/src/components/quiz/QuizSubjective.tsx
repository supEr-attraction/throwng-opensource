import { useState, useRef, useEffect, ChangeEvent } from "react";
import "@styles/quiz/QuizSubjective.scss";
import { ImVolumeMedium, ImVolumeMute2 } from "react-icons/im";

interface QuizSubjectiveProps {
  setCanSubmit: (canSubmit: boolean) => void;
  question: string;
  index: number;
  previewUrl?: string;
  quizImage?: string;
  onUserInput: (input: string) => void;
}

const QuizSubjective = ({
  onUserInput,
  setCanSubmit,
  question,
  index,
  previewUrl,
  quizImage,
}: QuizSubjectiveProps) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setUserAnswer("");
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [index, isMuted]);

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    setUserAnswer(answer);
    setCanSubmit(answer.trim() !== "");
    onUserInput(answer.trim());
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
    <div className="QuizSubjective">
      <div className="quiz-header">
        <h2>Q{index + 1}.</h2>
        {previewUrl && (
          <div className="quiz-audio" onClick={toggleMute}>
            {isMuted ? <ImVolumeMute2 /> : <ImVolumeMedium />}
            <audio ref={audioRef} muted={isMuted} src={previewUrl}></audio>
          </div>
        )}
      </div>
      <div className="sub-question">
        <p>{question}</p>
        {quizImage && <img src={quizImage} alt="Quiz related image" />}
      </div>
      <h2>정답 입력</h2>
      <input
        type="text"
        placeholder="정답을 입력 해 주세요."
        className="sub-answer"
        value={userAnswer}
        onChange={handleAnswerChange}
      />
    </div>
  );
};

export default QuizSubjective;
