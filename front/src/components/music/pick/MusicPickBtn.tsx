import { memo } from "react";
import youtubeMusic from "@assets/images/youtubeMusic.webp";
import "@styles/music/pick/MusicPickBtn.scss";

interface Props {
  text: string;
  className: string;
  onClick: () => void;
  disabled?: boolean;
}

const MusicPickBtn = ({
  text,
  className,
  onClick,
  disabled = false,
}: Props) => {
  return (
    <button
      className={`MusicPickBtn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text === "바로 듣기" && <img src={youtubeMusic} alt="" />}
      <div>{text}</div>
    </button>
  );
};

export default memo(MusicPickBtn);
