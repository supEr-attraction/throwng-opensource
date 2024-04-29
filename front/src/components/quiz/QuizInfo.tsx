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
          <span className="highlight">객관식, 주관식, OX</span> 문제가
          <br />
          주어집니다.
        </>
      ),
      checked: false,
    },
    {
      id: 3,
      text: (
        <>
          문제당 제한 시간은 <span className="highlight">20초</span>입니다.
        </>
      ),
      checked: false,
    },
    {
      id: 4,
      text: (
        <>
          한 문제라도 틀리면 <span className="highlight-red">끝!</span> <br />
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
          매일 <span className="highlight">기회는 한 번</span>입니다.
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

  const handleCheckkAll = () => {
    const allChecked = areAllChecked();

    const updatedItems = items.map((item) => ({
      ...item,
      checked: !allChecked,
    }));
    setItems(updatedItems);
  };

  useEffect(() => {
    setButtonVisible(areAllChecked());
  }, [items]);

  const handleQuizStart = () => {
    navigate("/quiz/count");
  };

  return (
    <div className="QuizInfo">
      <div className="quiz-group">
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
      <div className="all-check">
        <input
          type="checkbox"
          id="checkbox-all"
          checked={areAllChecked()}
          onClick={handleCheckkAll}
        />
        <label htmlFor="checkbox-all">다 알아요 ㅋ</label>
      </div>

      <div className={`quiz-button ${buttonVisible ? "visible" : ""}`}>
        <button onClick={handleQuizStart}>퀴즈 풀기</button>
      </div>
    </div>
  );
};

export default QuizInfo;
