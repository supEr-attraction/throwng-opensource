import "@styles/quiz/QuizInfo.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuizItem {
  id: number;
  text: JSX.Element;
  checked: boolean;
}

const QuizInfo = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<QuizItem[]>([
    {
      id: 1,
      text: (
        <>
          문제는 <span className="highlight">총 3문제</span>입니다.
        </>
      ),
      checked: false,
    },
    {
      id: 2,
      text: (
        <>
          <span className="highlight">객관식, 주관식, OX</span> 문제로 주관식은
          공백, 영어, 한글 모두 정답으로 인정됩니다.
        </>
      ),
      checked: false,
    },
    {
      id: 3,
      text: (
        <>
          문제당 제한 시간은 <span className="highlight">10초</span>입니다.
        </>
      ),
      checked: false,
    },
    {
      id: 4,
      text: (
        <>
          3문제 <span className="highlight">모두 맞춰야</span> 정답으로
          인정됩니다.
        </>
      ),
      checked: false,
    },
    {
      id: 5,
      text: (
        <>
          매일 <span className="highlight">기회는 한 번</span>뿐이니 신중하게
          풀어주세요.
        </>
      ),
      checked: false,
    },
  ]);

  const [buttonVisible, setButtonVisible] = useState(false);
  const areAllChecked = () => {
    return items.every((item) => item.checked);
  };

  const handleCheck = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  useEffect(() => {
    const allChecked = areAllChecked();
    if (allChecked && !buttonVisible) {
      setButtonVisible(true);
    }
  }, [items, buttonVisible]);

  const handleQuizStart = () => {
    navigate("/quiz/solve");
  };

  return (
    <div className="QuizInfo">
      <div className="quiz-group">
        <p className="heading">다음 안내 사항을 확인해주세요.</p>
        <div className="quiz-check">
          {items.map((item) => (
            <div key={item.id} className="check-item">
              <input
                id={`checkbox-${item.id}`}
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.text}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={`quiz-button ${buttonVisible ? 'visible' : ''}`}>
        <button onClick={handleQuizStart}>퀴즈풀기</button>
      </div>
    </div>
  );
};

export default QuizInfo;
