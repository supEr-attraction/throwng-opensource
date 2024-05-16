import "@styles/quiz/QuizInfo.scss";
import { useEffect, useMemo, useState } from "react";
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
          쿠폰을 얻을 때 까지 <br /><span className="highlight">재도전</span> 가능합니다
        </>
      ),
      checked: false,
    },
    {
      id: 6,
      text: (
        <>
          매일 쿠폰 발급은<span className="highlight"><br /> 한 번</span>입니다.
        </>
      ),
      checked: false,
    },
  ]);

  const [buttonVisible, setButtonVisible] = useState(false);
  const areAllChecked = useMemo(
    () => items.every((item) => item.checked),
    [items]
  );

  const handleCheck = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleCheckAll = () => {
    setItems(items.map((item) => ({ ...item, checked: !areAllChecked })));
  };

  useEffect(() => {
    setButtonVisible(areAllChecked);
  }, [areAllChecked]);

  const handleQuizStart = () => {
    navigate("/quiz/count", { replace: true });
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
          checked={areAllChecked}
          onChange={handleCheckAll}
        />
        <label htmlFor="checkbox-all">전체 확인</label>
      </div>

      <div className={`quiz-button ${buttonVisible ? "visible" : ""}`}>
        <button onClick={handleQuizStart} disabled={!areAllChecked}>퀴즈 풀기</button>
      </div>
    </div>
  );
};

export default QuizInfo;
