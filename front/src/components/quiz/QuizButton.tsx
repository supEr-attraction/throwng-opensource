import "@styles/quiz/QuizButton.scss";

interface QuizButtonProps {
  onClick: () => void;
  label: string;
  visible: boolean;
}

const QuizButton = ({ onClick, label, visible = true }: QuizButtonProps) => {
  if (!visible) return null;
  // button visible reuse logic (another page)
  // const [buttonVisible, setButtonVisible] = useState(false);

  // useEffect(() => {
  //   setButtonVisible(areAllChecked());
  // }, [items]);

  // const handleQuizStart = () => {
  //   navigate("/quiz/solve");
  // };

  return (
    <div className="QuizButton">
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default QuizButton;
