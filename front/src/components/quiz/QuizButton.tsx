import "@styles/quiz/QuizButton.scss";

interface QuizButtonProps {
  onClick: () => void;
  label: string;
  visible: boolean;
}

const QuizButton = ({ onClick, label, visible = true }: QuizButtonProps) => {
  if (!visible) return null;

  return (
    <div className="QuizButton">
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default QuizButton;
