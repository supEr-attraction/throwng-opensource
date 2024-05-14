import "@styles/quiz/QuizInfo.scss";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuizItem {
  id: number;
  text: JSX.Element;
  checked: boolean;
}

const MemoryInfo = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<QuizItem[]>([
    {
      id: 1,
      text: (
        <>
          총 <span className="highlight"> 20라운드</span>입니다.
        </>
      ),
      checked: false,
    },
    {
      id: 2,
      text: (
        <>
          <span className="highlight">2개 이상 틀리면 </span> 라운드가 <br />종료
          됩니다.
        </>
      ),
      checked: false,
    },
    {
      id: 3,
      text: (
        <>
          쿠폰을 얻을 때 까지
          <span className="highlight"> 재도전</span> 가능합니다
        </>
      ),
      checked: false,
    },
    {
      id: 4,
      text: (
        <>
          매일 쿠폰 발급은
          <span className="highlight"> 한 번</span>
          입니다.
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

  const handleGoMemoryGame = () => {
    navigate("/memory/game", { replace: true });
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
        <button onClick={handleGoMemoryGame}>게임시작</button>
      </div>
    </div>
  );
};

export default MemoryInfo;
