import React from "react";
import "@/styles/content/ContentButton.scss";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnText: string;
}

const ContentButton = ({ onClick, btnText }: Props) => {
  return (
    <div className="game-button">
      <button onClick={onClick}>
        {btnText}
      </button>
    </div>
  );
};

export default ContentButton;
