import { useEffect, useRef, useState } from "react";
import { ImVolumeMedium } from "react-icons/im";
import { ImVolumeMute2 } from "react-icons/im";
import "@styles/music/pick/AudioPlayer.scss";

const AudioPlayer = ({ previewUrl }: { previewUrl: string }) => {
  const [isPlay, setIsPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudioPlay = () => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => setIsPlay(false));
      }
      setIsPlay((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleEnded = () => setIsPlay(false);

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleEnded);

      audioRef.current.play().catch((error) => {
        console.error("Audio play failed", error);
        setIsPlay(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="AudioPlayer" onClick={toggleAudioPlay}>
      {isPlay ? <ImVolumeMedium /> : <ImVolumeMute2 />}
      <audio ref={audioRef} src={previewUrl} />
    </div>
  );
};

export default AudioPlayer;
